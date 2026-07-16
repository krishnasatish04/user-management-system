import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../models/RootState";

const Profile = () => {
  const { id } = useParams();

  const users = useSelector(
    (state: RootState) => state.users.users
  );

  const user = users.find(
    (item) => item.id === Number(id)
  );

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Card elevation={3}>
        <CardContent>

          <Stack
            sx={{
              alignItems: "center",
            }}
            spacing={2}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                fontSize: 32,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>

            <Typography variant="h4">
              {user.name}
            </Typography>

            <Chip
              label={user.role}
              color={
                user.role === "Admin"
                  ? "warning"
                  : "primary"
              }
            />
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Stack spacing={2}>

            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>

            <Typography>
              <strong>Role:</strong> {user.role}
            </Typography>

            <Typography>
              <strong>Status:</strong> Active
            </Typography>

          </Stack>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;