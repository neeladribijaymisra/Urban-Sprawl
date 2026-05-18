using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Data;
using UrbanScope.Api.Services;
using UrbanScope.Api.Models;

namespace UrbanScope.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/predictions")]
public class PredictionController(
    ApplicationDbContext dbContext,
    IMlPredictionService mlPredictionService,
    IWebHostEnvironment environment) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    private readonly IMlPredictionService _mlPredictionService = mlPredictionService;
    private readonly IWebHostEnvironment _environment = environment;

    [HttpPost("run/{uploadId:int}")]
    public async Task<ActionResult<Prediction>> RunPrediction(int uploadId, CancellationToken cancellationToken)
    {
        var upload = await _dbContext.SatelliteUploads.Include(x => x.Prediction).FirstOrDefaultAsync(x => x.Id == uploadId, cancellationToken);
        if (upload is null)
        {
            return NotFound("Upload not found.");
        }

        var existing = upload.Prediction;
        if (existing is not null)
        {
            return Ok(existing);
        }

        var imagePath = Path.Combine(_environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot"), upload.ImageUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
        var mlResult = await _mlPredictionService.PredictAsync(imagePath, cancellationToken);

        var greenCoverScore = GetScore(mlResult.Probabilities, "Forest")
            + GetScore(mlResult.Probabilities, "HerbaceousVegetation")
            + GetScore(mlResult.Probabilities, "Pasture")
            + GetScore(mlResult.Probabilities, "AnnualCrop")
            + GetScore(mlResult.Probabilities, "PermanentCrop");

        var prediction = new Prediction
        {
            UploadId = upload.Id,
            PredictedClass = mlResult.PredictedClass,
            Confidence = mlResult.Confidence,
            SprawlScore = mlResult.SprawlScore,
            ResidentialScore = GetScore(mlResult.Probabilities, "Residential"),
            IndustrialScore = GetScore(mlResult.Probabilities, "Industrial"),
            GreenCoverScore = greenCoverScore,
            FullProbabilityJson = JsonSerializer.Serialize(mlResult.Probabilities),
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Predictions.Add(prediction);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(prediction);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetAll()
    {
        var predictions = await _dbContext.Predictions
            .Include(prediction => prediction.Upload)
            .OrderByDescending(prediction => prediction.CreatedAt)
            .Select(prediction => new
            {
                prediction.Id,
                prediction.PredictedClass,
                prediction.Confidence,
                prediction.SprawlScore,
                prediction.CreatedAt,
                CityName = prediction.Upload!.CityName,
                LocationName = prediction.Upload!.LocationName,
                Year = prediction.Upload!.Year,
                UploadedAt = prediction.Upload!.UploadedAt
            })
            .ToListAsync();

        return Ok(predictions);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetById(int id)
    {
        var prediction = await _dbContext.Predictions.Include(x => x.Upload).FirstOrDefaultAsync(x => x.Id == id);
        if (prediction is null)
        {
            return NotFound();
        }

        var probabilities = JsonSerializer.Deserialize<Dictionary<string, double>>(prediction.FullProbabilityJson) ?? new();
        var chartData = probabilities.Select(item => new { name = item.Key, value = item.Value });

        return Ok(new
        {
            prediction.Id,
            prediction.PredictedClass,
            prediction.Confidence,
            prediction.SprawlScore,
            prediction.ResidentialScore,
            prediction.IndustrialScore,
            prediction.GreenCoverScore,
            prediction.CreatedAt,
            probabilities = chartData,
            upload = prediction.Upload
        });
    }

    private static double GetScore(Dictionary<string, double> scores, string key) =>
        scores.TryGetValue(key, out var value) ? value : 0;
}
