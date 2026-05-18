namespace UrbanScope.Api.Models;

public class Comparison
{
    public int Id { get; set; }
    public int TenantId { get; set; }
    public int OldUploadId { get; set; }
    public int NewUploadId { get; set; }
    public int OldYear { get; set; }
    public int NewYear { get; set; }
    public string OldClass { get; set; } = string.Empty;
    public string NewClass { get; set; } = string.Empty;
    public double SprawlScoreChange { get; set; }
    public string ChangeType { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Tenant? Tenant { get; set; }
    public SatelliteUpload? OldUpload { get; set; }
    public SatelliteUpload? NewUpload { get; set; }
}
