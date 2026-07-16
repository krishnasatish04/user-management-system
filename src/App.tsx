import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import usersData from "./data/data.json";

import { login } from "./redux/actions/authActions";
import { setUsers } from "./redux/actions/userActions";
import type { User } from "./models/User";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore logged-in user
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(login(JSON.parse(user)));
    }

    // Restore users
    const users = localStorage.getItem("users");

    if (users) {
      dispatch(setUsers(JSON.parse(users)));
    } else {
      dispatch(setUsers(usersData as User[]));
    }
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;