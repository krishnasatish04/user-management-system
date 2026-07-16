import {
  Grid,

} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useSelector } from "react-redux";
import type { RootState } from "../../models/RootState";

import StatCard from "../../components/common/StatCard";

const DashboardStats = () => {
  const users = useSelector((state: RootState) => state.users.users);

  const totalUsers = users.length;

  const admins = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const members = users.filter(
    (user) => user.role === "Member"
  ).length;

  const activeUsers = users.length;

  return (
      <Grid
          container
          spacing={3}
          sx={{
              mb: 4,
          }}
      >
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<GroupIcon color="primary" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={<CheckCircleIcon color="success" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Admins"
          value={admins}
          icon={<AdminPanelSettingsIcon color="warning" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Members"
          value={members}
          icon={<PersonIcon color="info" />}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardStats;