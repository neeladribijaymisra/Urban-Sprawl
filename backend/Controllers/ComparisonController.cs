using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Data;
using UrbanScope.Api.DTOs;
using UrbanScope.Api.Helpers;
using UrbanScope.Api.Models;

namespace UrbanScope.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/comparisons")]
public class ComparisonController(ApplicationDbContext dbContext) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    [HttpPost]
    public async Task<ActionResult<Comparison>> Create(CreateComparisonRequest request)
    {
        var oldUpload = await _dbContext.SatelliteUploads.Include(x => x.Prediction).FirstOrDefaultAsync(x => x.Id == request.OldUploadId);
        var newUpload = await _dbContext.SatelliteUploads.Include(x => x.Prediction).FirstOrDefaultAsync(x => x.Id == request.NewUploadId);

        if (oldUpload?.Prediction is null || newUpload?.Prediction is null)
        {
            return BadRequest("Both uploads must have predictions before comparison.");
        }

        var comparison = new Comparison
        {
            TenantId = newUpload.TenantId,
            OldUploadId = oldUpload.Id,
            NewUploadId = newUpload.Id,
            OldYear = oldUpload.Year,
            NewYear = newUpload.Year,
            OldClass = oldUpload.Prediction.PredictedClass,
            NewClass = newUpload.Prediction.PredictedClass,
            SprawlScoreChange = ComparisonRuleEngine.CalculateSprawlScoreChange(oldUpload.Prediction, newUpload.Prediction),
            ChangeType = ComparisonRuleEngine.GetChangeType(oldUpload.Prediction.PredictedClass, newUpload.Prediction.PredictedClass),
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Comparisons.Add(comparison);
        await _dbContext.SaveChangesAsync();
        return Ok(comparison);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comparison>>> GetAll() =>
        Ok(await _dbContext.Comparisons.OrderByDescending(x => x.CreatedAt).ToListAsync());
}
