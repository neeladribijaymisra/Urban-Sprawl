import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import PredictionHistoryTable from "../components/PredictionHistoryTable";
import { api } from "../services/api";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.getDashboardSummary().then(setSummary);
    api.getDashboardCharts().then(setChartData);
    api.getPredictionHistory().then(setHistory);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Urban growth intelligence at a glance"
        description="Monitor classification activity, sprawl signals, and recent detections across your tenant workspace."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Predictions" value={summary?.totalPredictions ?? "--"} subtitle="Across all uploads" />
        <StatCard title="Active Locations" value={summary?.activeLocations ?? "--"} subtitle="Cities under monitoring" />
        <StatCard title="Avg Confidence" value={`${summary?.averageConfidence ?? "--"}%`} subtitle="Model response reliability" />
        <StatCard title="Sprawl Alerts" value={summary?.sprawlAlerts ?? "--"} subtitle="Potential high-growth zones" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card elevation={0} className="rounded-3xl shadow-soft">
          <CardContent>
            <Typography variant="h6">Monthly Prediction Volume</Typography>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="predictions" stroke="#2f7d5f" strokeWidth={3} />
                  <Line type="monotone" dataKey="avgSprawl" stroke="#db9f4f" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card elevation={0} className="rounded-3xl bg-slate-950 text-white shadow-soft">
          <CardContent className="space-y-4 !p-6">
            <Typography variant="h6" className="!text-white">
              Watchlist Insight
            </Typography>
            <div className="rounded-3xl bg-white/10 p-5">
              <div className="text-sm uppercase tracking-[0.2em] text-brand-100">Highest Sprawl Shift</div>
              <div className="mt-3 text-3xl font-black">Hinjawadi, Pune</div>
              <div className="mt-2 text-slate-300">Green cover loss detected from 2018 to 2025 imagery.</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white/10 p-4">
                <div className="text-sm text-slate-300">Sprawl Index</div>
                <div className="mt-2 text-2xl font-bold">0.88</div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <div className="text-sm text-slate-300">Change Type</div>
                <div className="mt-2 text-lg font-bold">Green to Urban</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Typography variant="h6" className="mb-4">
          Recent Prediction History
        </Typography>
        <PredictionHistoryTable rows={history} />
      </div>
    </div>
  );
}
