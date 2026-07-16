import { LOGIN, LOGOUT } from "../types";

import type { User } from "../../models/User";

export const login = (user: User) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => {
    return {
        type: LOGOUT,
    };
};