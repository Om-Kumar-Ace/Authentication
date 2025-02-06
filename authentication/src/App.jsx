import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import CategoriesList from './pages/Menu';
import SignUpAuth from './pages/SignUpAuth';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupauth" element={<SignUpAuth />} />
        <Route path="/menu" element={<CategoriesList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
