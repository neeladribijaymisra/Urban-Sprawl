namespace UrbanScope.Api.DTOs;

public class MlPredictionResult
{
    public string PredictedClass { get; set; } = string.Empty;
    public double Confidence { get; set; }
    public double SprawlScore { get; set; }
    public Dictionary<string, double> Probabilities { get; set; } = new();
}
