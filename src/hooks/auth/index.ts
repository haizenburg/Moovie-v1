// useRegister.js
import { useState } from "react";
import supabase from "../supabaseClient";
import useUserSessionStore from "../../store/userSessionStore";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    setLoading(true);

    const { data: authUser, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authUser && !signUpError) {
      // Insert user details into the custom users table
      const { data: userData, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: authUser.user?.id,
            email: email,
            username: username
          }
        ]);

      if (!insertError && userData) {
        // Store user data in Zustand store
        useUserSessionStore.getState().setUserData({
          id: authUser.user?.id,
          email,
          username,
          hasCompletedOnboarding: false // Assuming this is a new user
        });
      }

      if (insertError) {
        // setError(insertError.message);
        console.log("insertError", insertError);
        setLoading(false);
        return { user: null, error: insertError };
      }

      setLoading(false);
      // Return the user data from the custom users table insertion if successful
      return { user: userData, error: null };
    } else {
      // Handle sign up errors
      //   setError(signUpError.message);
      console.log("signUpError", signUpError);
      setLoading(false);
      return { user: null, error: signUpError };
    }
  };

  return { register, loading, error };
}

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email: string, password: string) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (data && !error && data.user) {
      // Fetch user details
      const { data: userData, error: userDetailsError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userDetailsError) {
        //   setError(userDetailsError.message);

        console.log("userDetailsError", userDetailsError);
        setLoading(false);
        return { data: null, error: userDetailsError };
      }

      // Fetch user interests
      const { data: userInterestsData, error: userInterestsError } =
        await supabase
          .from("user_interests")
          .select("interest_name")
          .eq("user_id", data.user.id);

      if (userInterestsError) {
        //   setError(userInterestsError.message);
        setLoading(false);
        return { data: null, error: userInterestsError };
      }

      // Assuming userData and userInterestsData are correctly fetched
      if (userData) {
        console.log("userData", userData);
        useUserSessionStore.getState().setUserData(userData);
      }
      if (userInterestsData) {
        const interests = userInterestsData.map((item) => item.interest_name);
        useUserSessionStore.getState().setUserInterests(interests);
      }
    }

    setLoading(false);
    return { data, error };
  };

  return { login, loading, error };
}

export { useRegister, useLogin };
