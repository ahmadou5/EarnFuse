import { createClient } from "@supabase/supabase-js";


const Url = 'https://msdpxnahdkdwbqrinard.supabase.co'
const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZHB4bmFoZGtkd2JxcmluYXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMTc0NDgsImV4cCI6MjAzNzc5MzQ0OH0.COj78fseoAIyZ2dG1lPAfGNtKXX5dYtUeIHDaF4UFkI'


export const Supabase = createClient(
    Url,
    Key
)