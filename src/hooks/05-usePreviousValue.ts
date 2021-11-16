import { useRef } from 'react'

export const usePreviousValue = <T>(value: T): T => {
  const previousValue = useRef<T>(value)
  return previousValue.current
}
