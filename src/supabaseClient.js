import { createClient } from '@supabase/supabase-js';

/* 
  DIRECTIONS:
  1. Create a new Supabase project at https://supabase.com
  2. Create a table named 'reports' with:
     - id: UUID (primary key)
     - created_at: TIMESTAMPTZ (default now())
     - period_start: TEXT
     - period_end: TEXT
     - data: JSONB (stores the form results)
  3. Copy your project URL and API Key (Anon Key) from Project Settings -> API.
  4. Paste them here:
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tmkbvnfxvyevzrltpcmt.supabase.coL';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta2J2bmZ4dnlldnpybHRwY210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzMxNzcsImV4cCI6MjA5MTEwOTE3N30.4CkuW7AA1L2MfvNLN4Yc4lqiEzsKDObE2rKGLE0ysGA';

export const supabase = (supabaseUrl !== 'https://tmkbvnfxvyevzrltpcmt.supabase.coL')
  ? createClient(supabaseUrl, supabaseKey)
  : null;
