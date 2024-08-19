import { createClient } from "@supabase/supabase-js";
require('dotenv').config()

const Url = process.env.NEXT_PUBLIC_SUPERURL
const Key = process.env.NEXT_PUBLIC_SUPERKEY


export const Supabase = createClient(
    Url,
    Key
)