import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://wrmvjqqnovtacigjsafq.supabase.co'
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybXZqcXFub3Z0YWNpZ2pzYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MDM5NzUsImV4cCI6MjAyMzI3OTk3NX0.gcaVBxZMM_Xsu_iPx3vdDHKSPbbkYvAznuD_9mlPcMI'

export const supabase = createClient(PROJECT_URL, ANON_KEY)
