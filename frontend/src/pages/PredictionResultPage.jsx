import { useEffect, useState } from "react";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProbabilityCharts from "../components/ProbabilityCharts";
import { api } from "../services/api";

export default function PredictionResultPage() {
  const { id } = useParams();
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    api.getPredictionById(id).then(setPrediction);
  }, [id]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Prediction"
        title="Prediction result"
        description="Inspect the predicted class, confidence score, and urban sprawl indicators for the selected upload."
      />

      <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Card elevation={0} className="h-full rounded-3xl shadow-soft">
            <CardContent className="space-y-4 !p-6">
              <Chip label={prediction?.predictedClass ?? "Loading"} color="primary" />
              <Typography variant="h4">{((prediction?.confidence ?? 0) * 100).toFixed(0)}%</Typography>
              <Typography color="text.secondary">Prediction confidence</Typography>
              <div className="rounded-3xl bg-brand-50 p-4">
                <div className="text-sm text-brand-700">Sprawl Score</div>
                <div className="mt-2 text-3xl font-black text-brand-900">
                  {((prediction?.sprawlScore ?? 0) * 100).toFixed(0)}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card elevation={0} className="rounded-3xl shadow-soft">
            <CardContent className="grid gap-4 !p-6 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Residential Score</div>
                <div className="mt-2 text-2xl font-bold">
                  {((prediction?.residentialScore ?? 0) * 100).toFixed(0)}%
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Industrial Score</div>
                <div className="mt-2 text-2xl font-bold">
                  {((prediction?.industrialScore ?? 0) * 100).toFixed(0)}%
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Green Cover Score</div>
                <div className="mt-2 text-2xl font-bold">
                  {((prediction?.greenCoverScore ?? 0) * 100).toFixed(0)}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProbabilityCharts data={prediction?.probabilities ?? []} />
    </div>
  );
}
