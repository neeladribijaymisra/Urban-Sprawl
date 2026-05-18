namespace UrbanScope.Api.DTOs;

public class TenantRequest
{
    public string OrganizationName { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Plan { get; set; } = "Starter";
    public string Status { get; set; } = "Active";
}
