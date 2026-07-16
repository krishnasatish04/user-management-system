import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";

import type { User } from "../../models/User";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  user?: User | null;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const UserFormDialog = ({
  open,
  mode,
  user,
  onClose,
  onSubmit,
}: Props) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData(user);
    }

    if (mode === "add") {
      setFormData({
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "Member",
      });
    }
  }, [mode, user]);

  const handleChange = (
    field: keyof User,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "add"
          ? "Add User"
          : "Edit User"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
          />

          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
          />

          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
          />

          <TextField
            select
            label="Role"
            value={formData.role}
            onChange={(e) =>
              handleChange(
                "role",
                e.target.value
              )
            }
          >
            <MenuItem value="Admin">
              Admin
            </MenuItem>

            <MenuItem value="Member">
              Member
            </MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSubmit(formData)}
        >
          {mode === "add"
            ? "Add User"
            : "Update User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;