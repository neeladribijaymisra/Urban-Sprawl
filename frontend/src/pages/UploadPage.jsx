import { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    cityName: "Pune",
    locationName: "Hinjawadi Phase 2",
    year: "2025",
    latitude: "18.5912",
    longitude: "73.7389"
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const updateField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Upload"
        title="Upload a satellite image"
        description="Capture metadata for the location, preview imagery, and route the upload into the prediction workflow."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card elevation={0} className="rounded-3xl shadow-soft">
          <CardContent className="!p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <TextField label="City Name" fullWidth value={form.cityName} onChange={updateField("cityName")} />
              </div>
              <div>
                <TextField
                  label="Location Name"
                  fullWidth
                  value={form.locationName}
                  onChange={updateField("locationName")}
                />
              </div>
              <div>
                <TextField label="Year" fullWidth value={form.year} onChange={updateField("year")} />
              </div>
              <div>
                <TextField label="Latitude" fullWidth value={form.latitude} onChange={updateField("latitude")} />
              </div>
              <div>
                <TextField label="Longitude" fullWidth value={form.longitude} onChange={updateField("longitude")} />
              </div>
              <div className="md:col-span-2">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-brand-200 bg-brand-50/50 px-6 py-16 text-center">
                  <span className="text-lg font-bold text-brand-700">Drop image here or click to browse</span>
                  <span className="mt-2 text-sm text-slate-500">PNG, JPG, or TIFF imagery for demo flow</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                    />
                </label>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="contained" size="large" onClick={() => navigate("/app/prediction/101")}>
                Save and Run Prediction
              </Button>
              <Button variant="outlined" size="large">
                Save Metadata Only
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card elevation={0} className="rounded-3xl shadow-soft">
          <CardContent className="!p-6">
            <Typography variant="h6">Image Preview</Typography>
            <div className="mt-4 overflow-hidden rounded-[28px] bg-slate-100">
              {preview ? (
                <img src={preview} alt="Satellite preview" className="h-[360px] w-full object-cover" />
              ) : (
                <div className="flex h-[360px] items-center justify-center bg-gradient-to-br from-brand-100 via-white to-accent-100">
                  <div className="max-w-xs text-center">
                    <p className="text-xl font-bold text-slate-800">Preview will appear here</p>
                    <p className="mt-2 text-sm text-slate-500">
                      For now, the app is ready to simulate a complete upload and prediction path.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              The upload form captures location and year metadata so the backend can store image
              records, run the ML service, and support year-over-year comparison later.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
