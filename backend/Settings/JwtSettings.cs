namespace UrbanScope.Api.Settings;

public class JwtSettings
{
    public const string SectionName = "JwtSettings";

    public string Issuer { get; set; } = "UrbanScopeAI";
    public string Audience { get; set; } = "UrbanScopeAI.Client";
    public string SecretKey { get; set; } = "ReplaceThisWithASecureSecretKeyForLocalDevelopment123!";
    public int ExpiryMinutes { get; set; } = 180;
}
