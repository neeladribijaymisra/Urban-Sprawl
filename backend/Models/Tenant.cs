namespace UrbanScope.Api.Models;

public class Tenant
{
    public int Id { get; set; }
    public string OrganizationName { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Plan { get; set; } = "Starter";
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<SatelliteUpload> Uploads { get; set; } = new List<SatelliteUpload>();
    public ICollection<Comparison> Comparisons { get; set; } = new List<Comparison>();
}
