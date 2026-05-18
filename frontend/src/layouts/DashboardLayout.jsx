import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building2,
  History,
  ImageUp,
  LayoutDashboard,
  LogOut,
  Map,
  Scale
} from "lucide-react";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../services/authContext";

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/upload", label: "Upload", icon: ImageUp },
  { to: "/app/compare", label: "Compare", icon: Scale },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/map", label: "Map View", icon: Map },
  { to: "/app/admin", label: "Admin", icon: Building2 }
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200 bg-slate-950 px-6 py-8 text-white">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">UrbanScope AI</p>
          <h1 className="mt-3 text-2xl font-extrabold">Satellite Intelligence</h1>
          <p className="mt-3 text-sm text-slate-300">
            Multi-tenant urban sprawl monitoring for planning teams and geospatial analysts.
          </p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-10 rounded-3xl bg-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500/30 p-3">
              <BarChart3 size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Monitoring Window</p>
              <p className="text-xs text-slate-300">Latest imagery synced 6h ago</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-h-screen">
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          className="border-b border-white/70 !bg-white/80 !backdrop-blur-xl"
        >
          <Toolbar className="flex justify-between">
            <div>
              <Typography variant="h6">UrbanScope AI SaaS</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.tenantName} workspace
              </Typography>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="!bg-brand-500">{user?.fullName?.charAt(0) || "U"}</Avatar>
              <div className="hidden md:block">
                <div className="font-semibold">{user?.fullName}</div>
                <div className="text-sm text-slate-500">{user?.role}</div>
              </div>
              <IconButton
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut size={18} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
