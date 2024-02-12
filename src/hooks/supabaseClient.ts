import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://evpbxcqlcyejyzfudtxr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cGJ4Y3FsY3llanl6ZnVkdHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NzkyNjgsImV4cCI6MjAyMzI1NTI2OH0.X83voCPJ1huxY2lXynzWRSfys7DLMMrQPdwz11XUuh4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
