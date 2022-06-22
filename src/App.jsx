import React, { useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Calculator from './components/calculator/Calculator'
import './app.css'
import PersonalInformation from './components/personal-information/PersonalInformation'

const App = () => {
  useEffect(() => {
    for (var i = 0; i < 3; i++) {
      setTimeout(function () { console.log(i); }, 1000 + i)
    }
  }, [])

  const isAct = ({ isActive }) => {
    if (isActive) {
      return "active"
    } else {
      return ""
    }
  }

  return (
    <>
      <Router>
        <div className="navbar">
          <NavLink className={isAct} to='/'>Calculator</NavLink>
          <NavLink className={isAct} to='/personal-information'>Personal Information</NavLink>
        </div>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<Calculator />}></Route>
            <Route path='personal-information' element={<PersonalInformation />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App