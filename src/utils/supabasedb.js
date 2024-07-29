import { createClient } from "@supabase/supabase-js";
require('dotenv').config() 
const superUrl = process.env.SUPERURL;
const superKey = process.env.SUPERKEY;
export const supabase = createClient(superUrl,superKey)