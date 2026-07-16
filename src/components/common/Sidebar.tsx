import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";


import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../../models/RootState";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(
  (state: RootState) => state.auth
);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      label: "Users",
      icon: <GroupIcon />,
      path: "/users",
    },
    {
      label: "Profile",
      icon: <PersonIcon />,
        path: `/profile/${auth.user?.id}`,
    },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}

      <Typography
        variant="h6"
        sx={{
          p: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        User Management
      </Typography>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      {/* Menu */}

      <List sx={{ flex: 1, mt: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            // selected={location.pathname === item.path}
            selected={
              item.label === "Profile"
                ? location.pathname.startsWith("/profile")
                : location.pathname === item.path
            }
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 1,

              "&.Mui-selected": {
                bgcolor: "#2563eb",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#2563eb",
              },

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
    </Box>
  );
};

export default Sidebar;