import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-accent-100 px-4">
      <Card elevation={0} className="w-full max-w-md rounded-[32px] shadow-soft">
        <CardContent className="space-y-6 !p-8">
          <div>
            <Typography variant="h4">Welcome back</Typography>
            <Typography color="text.secondary" className="mt-2">
              Use the demo credentials flow to explore the tenant dashboard.
            </Typography>
          </div>
          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              login(form);
              navigate("/app");
            }}
          >
            Sign In
          </Button>
          <Typography color="text.secondary" className="text-center">
            New workspace?{" "}
            <Link to="/register" className="font-semibold text-brand-600">
              Create account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
