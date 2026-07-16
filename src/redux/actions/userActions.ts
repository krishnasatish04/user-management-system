import type { User } from "../../models/User";

import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_USERS,
} from "../types";

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});

export const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (user: User) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (id: number) => ({
  type: DELETE_USER,
  payload: id,
});