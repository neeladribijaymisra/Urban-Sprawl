import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import PredictionHistoryTable from "../components/PredictionHistoryTable";
import { api } from "../services/api";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.getPredictionHistory().then(setHistory);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Prediction history"
        description="Browse your previous uploads, predictions, and sprawl outcomes for quick review and reporting."
      />
      <div>
        <Typography variant="h6" className="mb-4">
          Recent Records
        </Typography>
        <PredictionHistoryTable rows={history} />
      </div>
    </div>
  );
}
