import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import MapPanel from "../components/MapPanel";
import { api } from "../services/api";

export default function MapViewPage() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    api.getMapData().then(setPoints);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Map"
        title="Interactive monitoring map"
        description="Visualize prediction markers across cities and inspect spatial hotspots with a map-first workflow."
      />
      <Card elevation={0} className="rounded-3xl shadow-soft">
        <CardContent className="space-y-4 !p-6">
          <Typography variant="h6">Monitored Locations</Typography>
          <MapPanel points={points} />
        </CardContent>
      </Card>
    </div>
  );
}
