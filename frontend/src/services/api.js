import {
  chartProbabilities,
  comparisonResult,
  dashboardSummary,
  historyRows,
  mapPoints,
  monthlyPredictions,
  tenantRows
} from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function fetchJson(path, options) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

export const api = {
  login: async () => ({ token: "demo-jwt-token" }),
  register: async (payload) => payload,
  getDashboardSummary: async () =>
    (await fetchJson("/dashboard/summary")) || dashboardSummary,
  getDashboardCharts: async () =>
    (await fetchJson("/dashboard/charts")) || monthlyPredictions,
  getMapData: async () => (await fetchJson("/dashboard/map-data")) || mapPoints,
  getPredictionHistory: async () => (await fetchJson("/predictions")) || historyRows,
  getPredictionById: async (id) =>
    (await fetchJson(`/predictions/${id}`)) || {
      id,
      predictedClass: "Residential",
      confidence: 0.94,
      sprawlScore: 0.88,
      residentialScore: 0.7,
      industrialScore: 0.12,
      greenCoverScore: 0.08,
      probabilities: chartProbabilities
    },
  getComparisonResult: async () => comparisonResult,
  getTenants: async () => (await fetchJson("/tenants")) || tenantRows,
  createUpload: async (payload) => payload,
  runPrediction: async (uploadId) =>
    (await fetchJson(`/predictions/run/${uploadId}`, { method: "POST" })) || {
      id: uploadId,
      predictedClass: "Residential",
      confidence: 0.94
    }
};
