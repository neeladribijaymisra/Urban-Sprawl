using Microsoft.AspNetCore.Http;

namespace UrbanScope.Api.DTOs;

public class CreateUploadRequest
{
    public string CityName { get; set; } = string.Empty;
    public string LocationName { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int Year { get; set; }
    public IFormFile? Image { get; set; }
}
