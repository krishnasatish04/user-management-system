import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

interface Props {
  search: string;
  role: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

const SearchFilter = ({
  search,
  role,
  onSearchChange,
  onRoleChange,
}: Props) => {
  return (
    <Grid container spacing={2}    sx={{
              mb: 3,
          }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <TextField
          fullWidth
          label="Search users..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          select
          label="Role"
          value={role}
          onChange={(e) =>
            onRoleChange(e.target.value)
          }
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SearchFilter;