import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lptcdtidbmkdcdcmascp.supabase.co"; // Thay bằng URL của dự án Supabase
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwdGNkdGlkYm1rZGNkY21hc2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjM4ODEsImV4cCI6MjA2MTQ5OTg4MX0.ImpuGOqv_6D1JKVmkGV-sRpX1lOglFZISFyxYg3lTgw"; // Thay bằng Anon Key của dự án

export const supabase = createClient(supabaseUrl, supabaseKey);
