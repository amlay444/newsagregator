import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kptjuvbtqqhesvyzjzsr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdGp1dmJ0cXFoZXN2eXpqenNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTU0MDMsImV4cCI6MjA0NjQ5MTQwM30.9i9D91CDcGf4uLcPy4UlZ2q3GEn3aZ1jPGdvRas-kTE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
