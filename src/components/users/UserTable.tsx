import {
    Avatar,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import type { User } from "../../models/User";
import ViewUserDialog from "./ViewUserDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/userActions";
import { updateUser } from "../../redux/actions/userActions";
import UserFormDialog from "./UserFormDialog";


interface Props {
    users: User[];
    currentUserRole?: "Admin" | "Member";
}

const UserTable = ({ users, currentUserRole }: Props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [openView, setOpenView] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);



    const navigate = useNavigate();

    const dispatch = useDispatch()


    const handleChangePage = (
      
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = users.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {paginatedUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                onClick={() => navigate(`/profile/${user.id}`)}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                            >
                                <TableCell>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <Avatar>
                                            {user.name.charAt(0)}
                                        </Avatar>

                                        {user.name}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {user.email}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={
                                            user.role === "Admin"
                                                ? "warning"
                                                : "primary"
                                        }
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label="Active"
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="center">

                                    <Tooltip title="View">
                                        <IconButton
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/profile/${user.id}`);
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>

                                    {currentUserRole === "Admin" && (
                                        <>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="warning"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedUser(user);
                                                        setOpenEdit(true);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete">
                                                <IconButton color="error" 
                                                    onClick={(e) => {
                                                         e.stopPropagation();
                                                        const updatedUsers = users.filter(
                                                            (item) => item.id !== user.id
                                                        );
                                                        localStorage.setItem(
                                                            "users",
                                                            JSON.stringify(updatedUsers)
                                                        );
                                                        dispatch(deleteUser(user.id));
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={users.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 15]}
            />
            <ViewUserDialog
                open={openView}
                user={selectedUser}
                onClose={() => setOpenView(false)}
            />

            <UserFormDialog
                open={openEdit}
                mode="edit"
                user={selectedUser}
                onClose={() => setOpenEdit(false)}
                onSubmit={(updatedUser) => {

                    const updatedUsers = users.map((item) =>
                        item.id === updatedUser.id
                            ? updatedUser
                            : item
                    );

                    localStorage.setItem(
                        "users",
                        JSON.stringify(updatedUsers)
                    );

                    dispatch(updateUser(updatedUser));

                    setOpenEdit(false);

                }}
            />
        </Paper>
    );
};

export default UserTable;