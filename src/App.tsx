import { useEffect } from 'react'
import { useNumber } from './hooks/01-useNumber'
import { useIsMounted } from './hooks/02-useIsMounted'
import { useToggle } from './hooks/03-useToggle'
import { useDebouncedValue } from './hooks/04-useDebouncedValue'
import { useRecordState } from './hooks/06-useRecordState'
import { useAsyncEffect } from './hooks/07-useAsyncEffect'
import { useEventListener } from './hooks/08-useEventListener'

function App() {
  const [number, setNumber] = useNumber(4)
  const isMounted = useIsMounted()
  const [isOpen, toggleIsOpen] = useToggle(false)
  const debouncedNumber = useDebouncedValue(number, 1000)
  const [isEnterEnabled, toggleIsEnterEnabled] = useToggle(true)

  useEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Enter') {
        console.log('Enter was pressed')
      }
    },
    { target: window, enabled: isEnterEnabled }
  )

  useEffect(() => {
    if (isMounted) {
      console.log('App is mounted')
    }
  }, [isMounted])

  return (
    <div>
      <h1>React Hooks with Typescript</h1>

      <button onClick={() => setNumber((number) => number + 1)}>
        Increment
      </button>
      <p>The number is {number}</p>
      <p>The debounced number is {debouncedNumber}</p>

      <button onClick={toggleIsOpen}>Toggle</button>
      <span> {isOpen ? 'True' : 'False'}</span>

      <h4>Toggle Enter</h4>

      <button onClick={toggleIsEnterEnabled}>
        Toggle Enter: {isEnterEnabled ? 'True' : 'False'}
      </button>

      <Child />

      <RecordState />

      <AsyncEffect />
    </div>
  )
}

const Child = () => {
  const isMounted = useIsMounted()
  const [isOpen, toggleIsOpen] = useToggle(false)

  useEffect(() => {
    if (isMounted) {
      console.log('Child is mounted')
    }
  }, [isMounted])
  return (
    <>
      <hr />
      <h4>Child</h4>
      <button onClick={toggleIsOpen}>Toggle</button>
      <span> {isOpen ? 'True' : 'False'}</span>
      <hr />
    </>
  )
}

const RecordState = () => {
  const [state, setState] = useRecordState({ name: 'John', age: 30 })

  function handleChange() {
    setState((state) => ({ ...state, age: state.age + 1 }))
  }

  return (
    <>
      <hr />
      <h4>RecordState</h4>

      <p>
        <strong>Name:</strong> {state.name}
      </p>
      <p>
        <strong>Age:</strong> {state.age}
      </p>

      <button onClick={handleChange}>Increment</button>
      <button onClick={() => setState({ name: 'Change w/o age' })}>
        Update Name
      </button>

      <hr />
    </>
  )
}

const AsyncEffect = () => {
  const [number, setNumber] = useNumber(0)
  const [count, setCount] = useNumber(0)

  useAsyncEffect(
    async () => {
      console.log('Async Effect is running')
      const res = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: { ok: 'true' } }), 1000)
      )

      console.log(res)
    },
    () => {
      console.log('Destructor called')
    },
    [number]
  )

  return (
    <>
      <hr />
      <h4>Async Effect</h4>

      <button onClick={() => setNumber((number) => number + 1)}>
        Increment Number
      </button>
      <p>The number is {number}</p>

      <button onClick={() => setCount((count) => count + 1)}>
        Increment Count
      </button>
      <p>The count is {count}</p>
      <hr />
    </>
  )
}

export default App
