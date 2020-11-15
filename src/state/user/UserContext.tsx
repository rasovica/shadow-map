import React from "react";
import { auth } from "../firebase";
import type firebase from "firebase";

interface UserState {
  user: firebase.User | null;
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
