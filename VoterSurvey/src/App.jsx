import { useState } from 'react'
import './App.css'
import Login from './Components/Login/Login';
import Mainpage from './Components/MainPage/Mainpage';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'



function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='' element={<Login/>} />
        <Route path='mainpage' element={<Mainpage/>} />
      </Routes>
    </Router>
    
    
    
  )
}

export default App
