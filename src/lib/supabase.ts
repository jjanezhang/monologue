import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createClient} from '@supabase/supabase-js'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env'

console.log('Supabase URL:', SUPABASE_URL ? 'defined' : 'undefined')
console.log(
  'Supabase Key:',
  SUPABASE_ANON_KEY
    ? 'defined (first 4 chars: ' + SUPABASE_ANON_KEY.slice(0, 4) + ')'
    : 'undefined',
)

const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
