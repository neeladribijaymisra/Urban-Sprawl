import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { api } from "../services/api";

export default function AdminTenantPage() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    api.getTenants().then(setTenants);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Administration"
        title="Tenant and workspace management"
        description="Review tenant plans, activity status, and user footprint in a simple admin-focused panel."
        action={<Button variant="contained">Add Tenant</Button>}
      />

      <TableContainer component={Paper} elevation={0} className="rounded-3xl shadow-soft">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organization</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Users</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Typography fontWeight={700}>{tenant.organizationName}</Typography>
                </TableCell>
                <TableCell>{tenant.city}</TableCell>
                <TableCell>{tenant.plan}</TableCell>
                <TableCell>
                  <Chip label={tenant.status} color="success" variant="outlined" />
                </TableCell>
                <TableCell>{tenant.users}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
