/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useUserSessionStore from "../../store/userSessionStore";
import { useFetchTodos } from "../../hooks/home/todo";
import { Movie, Todo } from "../../interface";
import { useAddTodo } from "../../hooks/home/todo";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";

export const TodoForm = ({ isVisible, onSubmit, movies }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserSessionStore();
  const { todos, loading } = useFetchTodos(user?.id);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useAddTodo();

  if (!isVisible) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("adding thee movie bro", task, selectedMovie, dueDate);
    onSubmit(task, selectedMovie, dueDate);
    addTodo({
      userId: user?.id,
      task,
      selectedMovie,
      dueDate
    });
    // Reset form
    setTask("");
    setDueDate("");
  };

  return (
    <div className="fixed bottom-20 left-10 bg-white p-4 rounded-lg shadow-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className={`py-2 flex items-center gap-4 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              <span>
                {todo.task} - {todo.selected_movie}
              </span>

              <CheckIcon className="w-5 h-5" />
              <TrashIcon className="w-5 h-5" />
            </div>
          ))}
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Add To-Do
          </button>
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="task"
              className="block text-sm font-medium text-gray-700"
            >
              Task
            </label>
            <input
              id="task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="What's next to watch?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="movie"
              className="block text-sm font-medium text-gray-700"
            >
              Movie
            </label>
            <select
              id="movie"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie: Movie, index: number) => (
                <option key={index} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
