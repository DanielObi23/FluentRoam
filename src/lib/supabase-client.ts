
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_KEY
const supabaseURL = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey || !supabaseURL || !supabaseServiceKey) {
    throw new Error("Supabase env variable missing")
}

export const supabase = createClient(supabaseURL, supabaseKey, {
  async accessToken() {
    return ((await auth()).getToken())
  },
})
export const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})