export const dashboardSummary = {
  totalPredictions: 284,
  activeLocations: 19,
  averageConfidence: 93.2,
  sprawlAlerts: 8
};

export const historyRows = [
  {
    id: 1,
    cityName: "Pune",
    locationName: "Hinjawadi Phase 2",
    year: 2024,
    predictedClass: "Residential",
    confidence: 0.94,
    sprawlScore: 0.88,
    uploadedAt: "2026-05-14T10:15:00"
  },
  {
    id: 2,
    cityName: "Bengaluru",
    locationName: "Whitefield East",
    year: 2023,
    predictedClass: "Industrial",
    confidence: 0.9,
    sprawlScore: 0.82,
    uploadedAt: "2026-05-12T08:30:00"
  },
  {
    id: 3,
    cityName: "Hyderabad",
    locationName: "Kokapet",
    year: 2025,
    predictedClass: "Highway",
    confidence: 0.87,
    sprawlScore: 0.79,
    uploadedAt: "2026-05-10T16:05:00"
  }
];

export const chartProbabilities = [
  { name: "Residential", value: 0.7 },
  { name: "Industrial", value: 0.12 },
  { name: "Highway", value: 0.05 },
  { name: "Forest", value: 0.02 },
  { name: "River", value: 0.02 },
  { name: "Other", value: 0.09 }
];

export const monthlyPredictions = [
  { month: "Jan", predictions: 18, avgSprawl: 0.51 },
  { month: "Feb", predictions: 22, avgSprawl: 0.54 },
  { month: "Mar", predictions: 27, avgSprawl: 0.61 },
  { month: "Apr", predictions: 31, avgSprawl: 0.66 },
  { month: "May", predictions: 29, avgSprawl: 0.63 },
  { month: "Jun", predictions: 36, avgSprawl: 0.69 }
];

export const mapPoints = [
  {
    id: 1,
    cityName: "Pune",
    locationName: "Hinjawadi",
    latitude: 18.5912,
    longitude: 73.7389,
    predictedClass: "Residential",
    sprawlScore: 0.88
  },
  {
    id: 2,
    cityName: "Bengaluru",
    locationName: "Whitefield",
    latitude: 12.9698,
    longitude: 77.75,
    predictedClass: "Industrial",
    sprawlScore: 0.82
  },
  {
    id: 3,
    cityName: "Hyderabad",
    locationName: "Kokapet",
    latitude: 17.4065,
    longitude: 78.3415,
    predictedClass: "Highway",
    sprawlScore: 0.79
  }
];

export const comparisonResult = {
  oldYear: 2018,
  newYear: 2025,
  oldClass: "Forest",
  newClass: "Residential",
  sprawlScoreChange: 0.52,
  changeType: "Green Cover to Urban Built-up"
};

export const tenantRows = [
  {
    id: 1,
    organizationName: "GreenGrid Analytics",
    city: "Pune",
    plan: "Growth",
    status: "Active",
    users: 12
  },
  {
    id: 2,
    organizationName: "CityVision Labs",
    city: "Bengaluru",
    plan: "Enterprise",
    status: "Active",
    users: 29
  }
];
