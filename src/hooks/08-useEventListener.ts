import { useEffect, useLayoutEffect, useRef } from 'react'

type UseEventListenerOptions = {
  enabled?: boolean
  target?: GlobalEventHandlers
}

type UseEventListener = <EventType extends keyof GlobalEventHandlersEventMap>(
  eventName: EventType,
  handler: (event: GlobalEventHandlersEventMap[EventType]) => void,
  options?: UseEventListenerOptions
) => void

const DEFAULT_OPTIONS: UseEventListenerOptions = {
  enabled: true,
  target: document,
}

export const useEventListener: UseEventListener = (
  eventType,
  handler,
  options = DEFAULT_OPTIONS
) => {
  const { enabled = true, target = document } = options

  // as 4 linhas abaixo são usadas para não precisar fazer memoização
  const handlerRef = useRef(handler)
  useLayoutEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) {
      return () => null
    }

    const eventHandler: typeof handlerRef.current = (event) => {
      handlerRef.current.call(target, event)
    }

    target.addEventListener(eventType, eventHandler)
    return () => {
      target.removeEventListener(eventType, eventHandler)
    }
  }, [eventType, target, enabled])
}
