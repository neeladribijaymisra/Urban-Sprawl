import { Typography } from "@mui/material";

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
        <Typography variant="h4" className="mt-2">
          {title}
        </Typography>
        <Typography color="text.secondary" className="mt-2 max-w-2xl">
          {description}
        </Typography>
      </div>
      {action}
    </div>
  );
}
