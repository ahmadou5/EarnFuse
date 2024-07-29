import { createClient } from "@supabase/supabase-js";

const Url = 'https://msdpxnahdkdwbqrinard.supabase.co'
const Key = 'McEdLvO1l/GqIs4b3XfZqfpF4rWdx5bMeeAnW3evrIKXK2QJ5xXemJ/eMne1LcpzxOX5OHBHquka5chFMYU0nQ=='
export const supabase = createClient(Url,Key)