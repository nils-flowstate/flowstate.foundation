import { useEffect } from 'react'
import { initScrollTracking } from '../lib/analytics'

export function useScrollDepth() {
  useEffect(() => {
    const cleanup = initScrollTracking()
    return cleanup
  }, [])
}
