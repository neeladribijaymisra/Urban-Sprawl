import { useEffect, useState } from "react";
import { Button, Card, CardContent, MenuItem, TextField, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { api } from "../services/api";

export default function CompareYearsPage() {
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    api.getComparisonResult().then(setComparison);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Compare"
        title="Compare land cover across years"
        description="Select two uploads or years to understand whether the area stayed stable, intensified, or shifted from green cover to built-up land."
        action={<Button variant="contained">Run Comparison</Button>}
      />

      <Card elevation={0} className="rounded-3xl shadow-soft">
        <CardContent className="!p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <TextField select label="City" fullWidth defaultValue="Pune">
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField select label="Old Year" fullWidth defaultValue="2018">
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField select label="New Year" fullWidth defaultValue="2025">
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </TextField>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card elevation={0} className="rounded-3xl bg-slate-950 text-white shadow-soft">
          <CardContent className="space-y-4 !p-6">
            <Typography variant="h6" className="!text-white">
              Change Summary
            </Typography>
            <div className="text-4xl font-black">{comparison?.changeType}</div>
            <div className="text-slate-300">
              Urban sprawl increased by {(comparison?.sprawlScoreChange ?? 0).toFixed(2)} points.
            </div>
          </CardContent>
        </Card>

        <Card elevation={0} className="rounded-3xl shadow-soft">
          <CardContent className="grid gap-4 !p-6 md:grid-cols-2">
            <div className="rounded-3xl bg-green-50 p-5">
              <div className="text-sm text-green-700">Old Year</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{comparison?.oldYear}</div>
              <div className="mt-2 text-slate-600">{comparison?.oldClass}</div>
            </div>
            <div className="rounded-3xl bg-orange-50 p-5">
              <div className="text-sm text-orange-700">New Year</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{comparison?.newYear}</div>
              <div className="mt-2 text-slate-600">{comparison?.newClass}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
