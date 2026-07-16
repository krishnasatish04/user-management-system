import {  useState } from "react";

import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";



import DashboardStats from "../Dashboard/DashboardStats";
import SearchFilter from "../Dashboard/SearchFilter";
import UserTable from "../../components/users/UserTable";



import type { RootState } from "../../models/RootState";


import UserFormDialog from "../../components/users/UserFormDialog";
import { addUser } from "../../redux/actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const users = useSelector(
    (state: RootState) => state.users.users
  );

  const auth = useSelector(
  (state: RootState) => state.auth
);


  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   dispatch(setUsers(usersData as User[]));
  // }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      role === "" || user.role === role;

    return matchesSearch && matchesRole;
  });

  const [openAddDialog, setOpenAddDialog] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography  
            sx={{variant:"h4" ,fontWeight:700}}>
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Manage and monitor users
          </Typography>
        </Box>

        {auth.user?.role === "Admin" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
           onClick={() => setOpenAddDialog(true)}
          >
            Add User
          </Button>
        )}
      </Box>

      <DashboardStats />

      <SearchFilter
        search={search}
        role={role}
        onSearchChange={setSearch}
        onRoleChange={setRole}
      />

      <UserTable 
      users={filteredUsers}
      currentUserRole={auth?.user?.role} />

      <UserFormDialog
        open={openAddDialog}
        mode="add"
        onClose={() => setOpenAddDialog(false)}
        onSubmit={(newUser) => {

        

          const updatedUsers = [...users, newUser];

          dispatch(addUser(newUser));

          localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
          );

          setOpenAddDialog(false);

        }}
      />
    </Box>
  );
};

export default Dashboard;