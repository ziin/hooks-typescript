import { useReducer } from 'react'

// export const useToggle = (initialValue: boolean) => {
//   const [state, setValue] = useState(initialValue)

//   const toggle = () => setValue((value) => !value)

//   return [state, toggle] as const
// }

// export const useToggle = (initialValue: boolean) => {
//   const [state, setValue] = useState(initialValue)

//   const toggle = useCallback(() => {
//     setValue((value) => !value)
//   }, [])

//   return [state, toggle]
// }

// Toda memoização tem um custo de performance, então é melhor usar o useReducer

export const useToggle = (initialValue: boolean) =>
  useReducer((state) => !state, initialValue)
