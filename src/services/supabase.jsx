import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://rgpocutmoxlxfjkmrioi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncG9jdXRtb3hseGZqa21yaW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0Njc3MzUsImV4cCI6MjA3MDA0MzczNX0.mPmqgOKOhbK7Iboub4f8LJ_kRNLxc5o_q9i0VxnDRX4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase