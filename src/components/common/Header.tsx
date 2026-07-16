import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../../models/RootState";
import { logout } from "../../redux/actions/authActions";

interface HeaderProps {
  isMobile: boolean;
  onMenuClick: () => void;
}

const Header = ({
  isMobile,
  onMenuClick,
}: HeaderProps) => {
  const auth = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="inherit"
    >
      <Toolbar>

        {/* Mobile Menu Button */}

        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Page Title */}

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>

        {/* Notifications */}

        <IconButton>
          <Badge
            badgeContent={3}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 3,
            cursor: "pointer",
          }}
          onClick={(e) =>
            setAnchorEl(e.currentTarget)
          }
        >
          <Avatar sx={{ mr: 1 }}>
            {auth.user?.name.charAt(0)}
          </Avatar>

          {!isMobile && (
            <>
              <Typography sx={{ mr: 1 }}>
                {auth.user?.name}
              </Typography>

              <KeyboardArrowDownIcon />
            </>
          )}
        </Box>

        {/* Profile Menu */}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              navigate(`/profile/${auth.user?.id}`);
              setAnchorEl(null);
            }}
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Header;