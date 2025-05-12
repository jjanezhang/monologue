import 'react-native-url-polyfill/auto'
import {supabase} from '../lib/supabase'

// Debug logging
console.log('Supabase client in service:', supabase ? 'defined' : 'undefined')

export interface DailyUpdate {
  id?: string
  created_at?: string
  content: string
}

export const supabaseService = {
  async createDailyUpdate(update: DailyUpdate) {
    try {
      const {data, error} = await supabase
        .from('daily_update')
        .insert(update)
        .select()

      if (error) {
        console.error('Supabase insert error:', error)
        return {data: null, error}
      }

      console.log('Created daily update:', data)
      return {data, error: null}
    } catch (error) {
      console.error('Error creating daily update:', error)
      return {data: null, error}
    }
  },

  async getDailyUpdates(options?: {limit?: number; offset?: number}) {
    try {
      let query = supabase
        .from('daily_update')
        .select('*')
        .order('created_at', {ascending: false})

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit)
      }

      if (options?.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || 10) - 1,
        )
      }

      const {data, error} = await query

      if (error) {
        console.error('Supabase select error:', error)
        return {data: null, error}
      }

      return {data, error: null}
    } catch (error) {
      console.error('Error getting daily updates:', error)
      return {data: null, error}
    }
  },
}
