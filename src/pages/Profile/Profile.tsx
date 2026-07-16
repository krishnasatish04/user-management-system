import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../models/RootState";

const Profile = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const users = useSelector(
    (state: RootState) => state.users.users
  );

  const user = users.find(
    (item) => item.id === Number(id)
  );

  if (!user) {
    return (
      <Typography variant="h5">
        User not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
        sx={{
          mb: 3,
        }}
      >
        Back to Dashboard
      </Button>

      <Grid container spacing={3}>

        {/* Profile Card */}

        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    fontSize: 40,
                    fontWeight: "bold",
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>

                <Typography
                  variant="h4"
                  sx={{
                    mt: 2,
                    fontWeight: 600,
                  }}
                >
                  {user.name}
                </Typography>

                <Chip
                  sx={{ mt: 2 }}
                  label={user.role}
                  color={
                    user.role === "Admin"
                      ? "warning"
                      : "primary"
                  }
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                User Information
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Email:</strong>
                <br />
                {user.email}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Role:</strong>
                <br />
                {user.role}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Status:</strong>
              </Typography>

              <Chip
                label="Active"
                color="success"
              />

            </CardContent>
          </Card>
        </Grid>

        {/* Video Card */}

        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Introduction Video
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                }}
              >
                <iframe
                  // src="https://player.vimeo.com/video/123456"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="User Introduction"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    borderRadius: "12px",
                  }}
                />
              </Box>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Profile;