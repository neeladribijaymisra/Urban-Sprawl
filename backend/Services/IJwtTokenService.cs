using UrbanScope.Api.Models;

namespace UrbanScope.Api.Services;

public interface IJwtTokenService
{
    string CreateToken(User user, string tenantName);
}
