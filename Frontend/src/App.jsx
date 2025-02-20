import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import  Login from "./pages/Login.jsx"
import  Home from "./pages/Home.jsx"
import Protected from './pages/Protected.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Protected />}>
          <Route path='/' element={<Home/>} />
      </Route>

     </Routes>
    </>
  )
}

export default App
