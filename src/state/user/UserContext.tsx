import React from "react";
import firebase from "firebase";
import User = firebase.User;
import { auth } from "../firebase";

interface UserState {
  user: User | null;
}
const initialState = { user: null };

export const UserContext = React.createContext<UserState>(initialState);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<UserState>(initialState);

  React.useEffect(() => {
    auth.onAuthStateChanged(
      (user) => user !== null && setUser((prev) => ({ ...prev, user }))
    );
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
