import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jccmvrgfgkuegqslhjot.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjY212cmdmZ2t1ZWdxc2xoam90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1MzQyMjUsImV4cCI6MjAxMzExMDIyNX0.lPS9IdMP5QzFGw2t-4P6VhK9uOlG2mGiHllj48GqMHY"

console.log(supabaseUrl, supabaseAnonKey, "lol");

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log(supabase, "lol22");