using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Data;
using UrbanScope.Api.DTOs;
using UrbanScope.Api.Helpers;
using UrbanScope.Api.Models;

namespace UrbanScope.Api.Controllers;

[ApiController]
[Authorize(Roles = $"{RoleNames.SuperAdmin},{RoleNames.TenantAdmin}")]
[Route("api/tenants")]
public class TenantController(ApplicationDbContext dbContext) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tenant>>> GetAll() =>
        Ok(await _dbContext.Tenants.OrderBy(t => t.OrganizationName).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Tenant>> Create(TenantRequest request)
    {
        var tenant = new Tenant
        {
            OrganizationName = request.OrganizationName,
            City = request.City,
            State = request.State,
            Country = request.Country,
            Plan = request.Plan,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Tenants.Add(tenant);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = tenant.Id }, tenant);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Tenant>> GetById(int id)
    {
        var tenant = await _dbContext.Tenants.FindAsync(id);
        return tenant is null ? NotFound() : Ok(tenant);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Tenant>> Update(int id, TenantRequest request)
    {
        var tenant = await _dbContext.Tenants.FindAsync(id);
        if (tenant is null)
        {
            return NotFound();
        }

        tenant.OrganizationName = request.OrganizationName;
        tenant.City = request.City;
        tenant.State = request.State;
        tenant.Country = request.Country;
        tenant.Plan = request.Plan;
        tenant.Status = request.Status;

        await _dbContext.SaveChangesAsync();
        return Ok(tenant);
    }

    [Authorize(Roles = RoleNames.SuperAdmin)]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tenant = await _dbContext.Tenants.FindAsync(id);
        if (tenant is null)
        {
            return NotFound();
        }

        _dbContext.Tenants.Remove(tenant);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
