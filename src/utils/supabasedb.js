import { createClient } from "@supabase/supabase-js";


const Url = process.env.SUPERURL
const Key = process.env.SUPERKEY


export const Supabase = createClient(
    Url,
    Key
)