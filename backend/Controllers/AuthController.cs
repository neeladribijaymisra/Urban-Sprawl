using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Data;
using UrbanScope.Api.DTOs;
using UrbanScope.Api.Models;
using UrbanScope.Api.Services;

namespace UrbanScope.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    ApplicationDbContext dbContext,
    IJwtTokenService jwtTokenService) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    private readonly IJwtTokenService _jwtTokenService = jwtTokenService;
    private readonly PasswordHasher<User> _passwordHasher = new();

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        if (await _dbContext.Users.AnyAsync(user => user.Email == request.Email))
        {
            return BadRequest("A user with this email already exists.");
        }

        var tenant = await _dbContext.Tenants.FindAsync(request.TenantId);
        if (tenant is null)
        {
            return BadRequest("Invalid tenant.");
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Role = string.IsNullOrWhiteSpace(request.Role) ? "User" : request.Role,
            TenantId = request.TenantId,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        var token = _jwtTokenService.CreateToken(user, tenant.OrganizationName);
        return Ok(new AuthResponse(token, user.Id, user.FullName, user.Email, user.Role, user.TenantId, tenant.OrganizationName));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var user = await _dbContext.Users.Include(x => x.Tenant).FirstOrDefaultAsync(x => x.Email == request.Email);
        if (user is null || !user.IsActive)
        {
            return Unauthorized("Invalid credentials.");
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized("Invalid credentials.");
        }

        var tenantName = user.Tenant?.OrganizationName ?? "Unknown Tenant";
        var token = _jwtTokenService.CreateToken(user, tenantName);
        return Ok(new AuthResponse(token, user.Id, user.FullName, user.Email, user.Role, user.TenantId, tenantName));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<object>> Me()
    {
        var userId = GetUserId();
        var user = await _dbContext.Users.Include(x => x.Tenant).FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null)
        {
            return NotFound();
        }

        return Ok(new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role,
            user.TenantId,
            TenantName = user.Tenant?.OrganizationName
        });
    }

    private int GetUserId()
    {
        var value = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var userId) ? userId : 0;
    }
}
