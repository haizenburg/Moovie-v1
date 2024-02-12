/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import supabase from "../supabaseClient";

function useUpdateUserInterests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserInterests = async (
    userId: string,
    selectedInterests: any
  ) => {
    setLoading(true);

    try {
      // Prepare records for insertion
      const records = selectedInterests.map((interestName: string) => ({
        user_id: userId,
        interest_name: interestName
      }));

      const { error: insertError } = await supabase
        .from("user_interests")
        .upsert(records, { onConflict: "user_id, interest_name" });

      if (insertError) throw insertError;

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({ has_completed_onboarding: true })
        .eq("id", userId);

      if (updateError) throw updateError;

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { updateUserInterests, loading, error };
}

export default useUpdateUserInterests;
