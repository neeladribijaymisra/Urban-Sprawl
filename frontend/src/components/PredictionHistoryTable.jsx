import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { formatDate, formatPercent } from "../utils/formatters";

export default function PredictionHistoryTable({ rows }) {
  return (
    <TableContainer component={Paper} elevation={0} className="rounded-3xl shadow-soft">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Confidence</TableCell>
            <TableCell>Sprawl Score</TableCell>
            <TableCell>Uploaded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="font-semibold">{row.cityName}</div>
                <div className="text-xs text-slate-500">{row.locationName}</div>
              </TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>
                <Chip
                  label={row.predictedClass}
                  className="!bg-brand-50 !font-semibold !text-brand-700"
                />
              </TableCell>
              <TableCell>{formatPercent(row.confidence)}</TableCell>
              <TableCell>{formatPercent(row.sprawlScore)}</TableCell>
              <TableCell>{formatDate(row.uploadedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
