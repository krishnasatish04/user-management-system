import type { AuthState } from "./AuthState";
import type { UserState } from "./UserState";

export interface RootState {
  auth: AuthState;
  users: UserState;
}