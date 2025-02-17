import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container bg-red-500 mx-auto'>
        <p>Click on the Vite and React logos to learn more</p>
      </div>
    </>
  )
}

export default App
