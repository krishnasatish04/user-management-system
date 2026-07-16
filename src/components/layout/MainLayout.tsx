import { useState } from "react";

import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const drawerWidth = 250;

const MainLayout = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Desktop Sidebar */}

      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </Box>
      )}

      {/* Mobile Drawer */}

      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      {/* Content */}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        <Header
          isMobile={isMobile}
          onMenuClick={handleDrawerToggle}
        />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;