const SUPABASE_URL =
"https://pcasgvdhbxmtzplbgdsq.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXNndmRoYnhtdHpwbGJnZHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MTQyMjQsImV4cCI6MjA5NzA5MDIyNH0.qRk2ceOCVHvsL20VPZ_J9Pjy0WuNikPQru15qU2iacE";

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);