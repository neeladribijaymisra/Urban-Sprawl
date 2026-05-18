import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { ArrowRight, Leaf, MapPinned, Radar } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Satellite Classification",
    description: "Upload imagery and classify land cover patterns with urban sprawl scoring.",
    icon: Radar
  },
  {
    title: "Map-Centric Insight",
    description: "Track prediction markers, high-risk zones, and changing land use on interactive maps.",
    icon: MapPinned
  },
  {
    title: "Green Cover Monitoring",
    description: "Compare years and detect when green areas shift into built-up urban surfaces.",
    icon: Leaf
  }
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[length:24px_24px] opacity-25" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-500/30 to-transparent" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <Typography variant="h5" className="!font-extrabold">
            UrbanScope AI SaaS
          </Typography>
          <div className="flex gap-3">
            <Button component={Link} to="/login" variant="text" className="!text-white">
              Login
            </Button>
            <Button component={Link} to="/register" variant="contained" color="secondary">
              Start Free
            </Button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Chip label="Land Cover Intelligence for Growing Cities" className="!bg-white/10 !text-white" />
            <Typography variant="h2" className="mt-6 max-w-3xl !text-5xl !font-black !leading-tight lg:!text-6xl">
              Detect urban sprawl before it becomes a planning blind spot.
            </Typography>
            <Typography className="mt-6 max-w-2xl !text-lg !text-slate-300">
              UrbanScope AI helps planning teams, researchers, and consultants classify satellite
              imagery, compare land cover across years, and monitor built-up expansion across locations.
            </Typography>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
              >
                Launch Workspace
              </Button>
              <Button component={Link} to="/login" size="large" variant="outlined" className="!border-white/20 !text-white">
                View Demo Dashboard
              </Button>
            </div>
          </div>

          <Card elevation={0} className="rounded-[32px] border border-white/10 bg-white/10 shadow-soft backdrop-blur-xl">
            <CardContent className="space-y-6 !p-8">
              <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-50">Latest Detection</p>
                <p className="mt-4 text-4xl font-black">Residential</p>
                <p className="mt-2 text-brand-50">Confidence 94% • Sprawl Score 88%</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                      <Icon size={20} className="text-accent-300" />
                      <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
