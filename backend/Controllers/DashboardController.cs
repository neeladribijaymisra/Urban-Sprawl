using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Data;

namespace UrbanScope.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/dashboard")]
public class DashboardController(ApplicationDbContext dbContext) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    [HttpGet("summary")]
    public async Task<ActionResult<object>> Summary()
    {
        var totalPredictions = await _dbContext.Predictions.CountAsync();
        var activeLocations = await _dbContext.SatelliteUploads.Select(x => x.LocationName).Distinct().CountAsync();
        var averageConfidence = await _dbContext.Predictions.AnyAsync()
            ? Math.Round(await _dbContext.Predictions.AverageAsync(x => x.Confidence) * 100, 1)
            : 0;
        var sprawlAlerts = await _dbContext.Predictions.CountAsync(x => x.SprawlScore >= 0.75);

        return Ok(new
        {
            totalPredictions,
            activeLocations,
            averageConfidence,
            sprawlAlerts
        });
    }

    [HttpGet("charts")]
    public async Task<ActionResult<object>> Charts()
    {
        var chartData = await _dbContext.Predictions
            .GroupBy(prediction => prediction.CreatedAt.Month)
            .Select(group => new
            {
                monthNumber = group.Key,
                month = new DateTime(2000, group.Key, 1).ToString("MMM"),
                predictions = group.Count(),
                avgSprawl = Math.Round(group.Average(x => x.SprawlScore), 2)
            })
            .OrderBy(item => item.monthNumber)
            .ToListAsync();

        return Ok(chartData);
    }

    [HttpGet("map-data")]
    public async Task<ActionResult<object>> MapData()
    {
        var mapData = await _dbContext.SatelliteUploads
            .Include(upload => upload.Prediction)
            .Where(upload => upload.Prediction != null)
            .Select(upload => new
            {
                upload.Id,
                upload.CityName,
                upload.LocationName,
                upload.Latitude,
                upload.Longitude,
                PredictedClass = upload.Prediction!.PredictedClass,
                SprawlScore = upload.Prediction!.SprawlScore
            })
            .ToListAsync();

        return Ok(mapData);
    }
}
