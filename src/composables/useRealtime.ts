import { supabase } from '@/lib/supabase'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export const useRealtime = <T extends { id: string }>(
  tableName: string,
  items: T[],
  onChange?: (payload: RealtimePostgresChangesPayload<T>) => void,
) => {
  let channel: RealtimeChannel | null = null

  const subscribe = () => {
    if (channel) return
    channel = supabase
      .channel(`${tableName}-changes`)
      .on<T>('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => {
        console.log(`[${tableName}] cambio detectado`, payload)

        if (payload.eventType === 'INSERT') {
          items.push(payload.new)
        }
        // if (payload.eventType === 'UPDATE') {
        //   const index = items.findIndex((item) => item.id === payload.new.id)
        //   if (index !== -1) items[index] = payload.new
        // }
        // if (payload.eventType === 'DELETE') {
        //   const index = items.findIndex((item) => item.id === payload.old.id)
        //   if (index !== -1) items.splice(index, 1)
        // }

        if (onChange) onChange(payload)
      })
      .subscribe()
  }
  const unsubscribe = () => {
    if (channel) {
      supabase.removeChannel(channel)
      channel = null
    }
  }

  return { subscribe, unsubscribe }
}
