import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
dotenv.config()




const Url = process.env.SUPERURL
const Key = process.env.SUPERKEY

export const Supabase = createClient(
    Url,
    Key
)