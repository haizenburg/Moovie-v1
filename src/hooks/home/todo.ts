import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = async ({ userId, task, selectedMovie, dueDate }) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.from("list").insert([
        {
          user_id: userId,
          task: task,
          selected_movie: selectedMovie,
          due_date: dueDate
        }
      ]);

      if (error) throw error;

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { addTodo, loading, error };
};

const useFetchTodos = (userId: any) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("list")
          .select("*")
          .eq("user_id", userId);

        if (error) throw error;
        console.log("data", data);
        setTodos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userId]);

  return { todos, loading, error };
};

export { useAddTodo, useFetchTodos };
