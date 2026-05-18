namespace UrbanScope.Api.Models;

public class Prediction
{
    public int Id { get; set; }
    public int UploadId { get; set; }
    public string PredictedClass { get; set; } = string.Empty;
    public double Confidence { get; set; }
    public double SprawlScore { get; set; }
    public double ResidentialScore { get; set; }
    public double IndustrialScore { get; set; }
    public double GreenCoverScore { get; set; }
    public string FullProbabilityJson { get; set; } = "{}";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public SatelliteUpload? Upload { get; set; }
}
