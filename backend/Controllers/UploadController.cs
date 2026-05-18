using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
[Route("api/uploads")]
public class UploadController(ApplicationDbContext dbContext, IWebHostEnvironment environment) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    private readonly IWebHostEnvironment _environment = environment;

    [HttpPost]
    public async Task<ActionResult<SatelliteUpload>> Create([FromForm] CreateUploadRequest request)
    {
        var userId = GetUserId();
        var tenantId = GetTenantId();
        var uploadsPath = Path.Combine(_environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot"), "uploads");
        Directory.CreateDirectory(uploadsPath);

        string imageUrl = string.Empty;
        if (request.Image is not null && request.Image.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(request.Image.FileName)}";
            var filePath = Path.Combine(uploadsPath, fileName);
            await using var stream = System.IO.File.Create(filePath);
            await request.Image.CopyToAsync(stream);
            imageUrl = $"/uploads/{fileName}";
        }

        var upload = new SatelliteUpload
        {
            TenantId = tenantId,
            UserId = userId,
            CityName = request.CityName,
            LocationName = request.LocationName,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Year = request.Year,
            ImageUrl = imageUrl,
            UploadedAt = DateTime.UtcNow
        };

        _dbContext.SatelliteUploads.Add(upload);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = upload.Id }, upload);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SatelliteUpload>>> GetAll()
    {
        var query = _dbContext.SatelliteUploads.AsQueryable();
        if (!User.IsInRole(RoleNames.SuperAdmin))
        {
            var tenantId = GetTenantId();
            query = query.Where(upload => upload.TenantId == tenantId);
        }

        var uploads = await query.OrderByDescending(upload => upload.UploadedAt).ToListAsync();
        return Ok(uploads);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SatelliteUpload>> GetById(int id)
    {
        var upload = await _dbContext.SatelliteUploads.FindAsync(id);
        return upload is null ? NotFound() : Ok(upload);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var upload = await _dbContext.SatelliteUploads.FindAsync(id);
        if (upload is null)
        {
            return NotFound();
        }

        _dbContext.SatelliteUploads.Remove(upload);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    private int GetUserId()
    {
        var value = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var userId) ? userId : 0;
    }

    private int GetTenantId()
    {
        var value = User.FindFirstValue("tenantId");
        return int.TryParse(value, out var tenantId) ? tenantId : 0;
    }
}
