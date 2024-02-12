import create from "zustand";
import supabase from "../hooks/supabaseClient";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  signIn: async (email, password) => {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    set(() => ({ user }));
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set(() => ({ user: null }));
  }
}));
