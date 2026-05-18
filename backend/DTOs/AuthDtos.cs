namespace UrbanScope.Api.DTOs;

public record RegisterRequest(
    string FullName,
    string Email,
    string Password,
    string Role,
    int TenantId);

public record LoginRequest(string Email, string Password);

public record AuthResponse(
    string Token,
    int UserId,
    string FullName,
    string Email,
    string Role,
    int TenantId,
    string TenantName);
