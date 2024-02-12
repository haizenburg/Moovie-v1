/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = async ({ userId, task, selectedMovie, dueDate }: any) => {
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
    } catch (err: any) {
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

        const todoData: any = data;
        setTodos(todoData);
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
