import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string | null | undefined;
  email: string | null | undefined;
  username: string | null;
  hasCompletedOnboarding: boolean;
}

interface UserSessionState {
  user: User | null;
  interests: string[]; // Array to store user interests
  setUserData: (user: User) => void;
  setUserInterests: (interests: string[]) => void; // Function to update interests
  clearUserData: () => void;
}

// interface UserSessionActions {
//   setUserData: (user: User) => void;
//   clearUserData: () => void;
// }

type UserSessionStore = UserSessionState;

const useUserSessionStore = create<UserSessionStore>(
  persist(
    (set) => ({
      user: null, // Default state
      setUserData: (user: User) => set({ user }),
      clearUserData: () => set({ user: null })
    }),
    {
      name: "user-session", // unique name for localStorage key
      getStorage: () => localStorage // specify localStorage as the storage option
    }
  )
);

export default useUserSessionStore;
