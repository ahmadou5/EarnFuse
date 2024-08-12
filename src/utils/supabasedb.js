import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'

require('dotenv').config()


const Url = process.env.SUPERURL
const Key = process.env.SUPERKEY
 
console.log('url',Url)
console.log('key',Key)
export const Supabase = createClient(
    Url,
    Key
)