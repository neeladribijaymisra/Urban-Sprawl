import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, subtitle }) {
  return (
    <Card elevation={0} className="rounded-3xl shadow-soft">
      <CardContent className="space-y-2">
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography color="text.secondary" variant="body2">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
