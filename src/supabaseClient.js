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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = (supabaseUrl !== 'YOUR_SUPABASE_URL') 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
