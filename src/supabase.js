import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvubarzytqwsmfzdpxrh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dWJhcnp5dHF3c21memRweHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTkxNzIsImV4cCI6MjA2Mjc5NTE3Mn0.-kZiPCWQ-mQM0Lwrzc_ws19j6Nyp5WEQJV7PJ4u1ttQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
