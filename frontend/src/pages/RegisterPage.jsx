import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    city: "",
    email: "",
    password: ""
  });

  const updateField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-brand-900 to-brand-700 px-4 py-10">
      <Card elevation={0} className="w-full max-w-3xl rounded-[32px] shadow-soft">
        <CardContent className="space-y-6 !p-8">
          <div>
            <Typography variant="h4">Create your UrbanScope workspace</Typography>
            <Typography color="text.secondary" className="mt-2">
              Set up a tenant and start running land cover classification locally.
            </Typography>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <TextField label="Full Name" fullWidth value={form.fullName} onChange={updateField("fullName")} />
            </div>
            <div>
              <TextField
                label="Organization Name"
                fullWidth
                value={form.organization}
                onChange={updateField("organization")}
              />
            </div>
            <div>
              <TextField label="City" fullWidth value={form.city} onChange={updateField("city")} />
            </div>
            <div>
              <TextField label="Email" fullWidth value={form.email} onChange={updateField("email")} />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={form.password}
                onChange={updateField("password")}
              />
            </div>
          </div>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              login(form);
              navigate("/app");
            }}
          >
            Create Workspace
          </Button>
          <Typography color="text.secondary" className="text-center">
            Already have access?{" "}
            <Link to="/login" className="font-semibold text-brand-600">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
