import usersData from "../data/data.json";
import type { User } from "../models/User";

//When TypeScript imports JSON, it infers it role is string
//Tell TypeScript that your JSON follows the User interface 
const users = usersData as User[];

export const login = (
  email: string,
  password: string
): User | null => {
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });

  return user || null;
};