import type { User } from "../../models/User";
import type { UserState } from "../../models/UserState";

import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_USERS,
} from "../types";

const initialState: UserState = {
  users: [],
};

const userReducer = (
  state = initialState,
  action: any // We'll improve this later
): UserState => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user: User) =>
          user.id === action.payload.id
            ? action.payload
            : user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user: User) => user.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default userReducer;