import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import type { User } from "../../models/User";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const ViewUserDialog = ({
  open,
  user,
  onClose,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>User Details</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography>
            <strong>Name:</strong> {user?.name}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user?.email}
          </Typography>

          <Typography>
            <strong>Role:</strong> {user?.role}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUserDialog;