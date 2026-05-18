using UrbanScope.Api.DTOs;

namespace UrbanScope.Api.Services;

public interface IMlPredictionService
{
    Task<MlPredictionResult> PredictAsync(string imagePath, CancellationToken cancellationToken = default);
}
