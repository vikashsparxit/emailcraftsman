// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pamqvbngoomsgkglnbnt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbXF2Ym5nb29tc2drZ2xuYm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzUxOTQsImV4cCI6MjA1MDAxMTE5NH0.Lw4YHqoGHitDbi91AwY6Vb4GeltAPxbtf8RdIitNKd8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);