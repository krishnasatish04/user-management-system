import { LOGIN, LOGOUT } from "../types";

import type { AuthState } from "../../models/AuthState";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }

};

export default authReducer;