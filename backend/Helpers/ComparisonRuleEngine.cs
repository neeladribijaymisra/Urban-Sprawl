using UrbanScope.Api.Models;

namespace UrbanScope.Api.Helpers;

public static class ComparisonRuleEngine
{
    private static readonly HashSet<string> UrbanClasses = ["Residential", "Industrial", "Highway"];
    private static readonly HashSet<string> GreenClasses =
    [
        "Forest",
        "HerbaceousVegetation",
        "Pasture",
        "AnnualCrop",
        "PermanentCrop"
    ];

    public static string GetChangeType(string oldClass, string newClass)
    {
        if (GreenClasses.Contains(oldClass) && UrbanClasses.Contains(newClass))
        {
            return "Green Cover to Urban Built-up";
        }

        if (oldClass == "Residential" && newClass == "Industrial")
        {
            return "Residential to Industrial Expansion";
        }

        if (UrbanClasses.Contains(oldClass) && UrbanClasses.Contains(newClass))
        {
            return "Urban Zone Continued";
        }

        return "Minimal Land Cover Change";
    }

    public static double CalculateSprawlScoreChange(Prediction oldPrediction, Prediction newPrediction)
        => Math.Round(newPrediction.SprawlScore - oldPrediction.SprawlScore, 4);
}
