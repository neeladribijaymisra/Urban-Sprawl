import { Card, CardContent, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const colors = ["#2f7d5f", "#db9f4f", "#0f766e", "#7c9a6d", "#5f7adb", "#94a3b8"];

export default function ProbabilityCharts({ data }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card elevation={0} className="rounded-3xl shadow-soft">
        <CardContent>
          <Typography variant="h6">Probability Distribution</Typography>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={60} outerRadius={110} paddingAngle={4}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card elevation={0} className="rounded-3xl shadow-soft">
        <CardContent>
          <Typography variant="h6">Class Confidence Breakdown</Typography>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
