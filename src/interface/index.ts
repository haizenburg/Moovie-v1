export interface Todo {
  id: string; // Assuming 'id' is a UUID.
  user_id: string; // User ID to associate the to-do with a specific user.
  task: string; // Description of the to-do item.
  selected_movie: string; // Title of the selected movie for the to-do.
  due_date: string; // ISO 8601 date string for the due date.
  completed: boolean; // Whether the to-do item has been completed.
  created_at?: string; // Optional, ISO 8601 date string for when the to-do was created.
}

export interface Movie {
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  genre_ids: number[];
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}
