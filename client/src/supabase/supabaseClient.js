import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKEY) throw new Error("Supabase URL or API key not defined");

export const supabase = createClient(supabaseURL, supabaseKEY);

