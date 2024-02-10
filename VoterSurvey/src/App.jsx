import { useState } from 'react'
import './App.css'
import Login from './Components/Login/Login';
import Mainpage from './Components/MainPage/Mainpage';
import VoterList from './Components/VotersList/VoterList';
import BoothList from './Components/BoothList/BoothList';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SurveyForm from './Components/SurveyForm/SurveyForm';



function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='' element={<Login/>} />
        <Route path='mainpage' element={<Mainpage/>} />
        <Route path='mainpage/booth-list' element={<BoothList/>} />
        <Route path='mainpage/booth-list/booth-voter-list/:BoothNo' element={<VoterList/>} />
        <Route path='mainpage/booth-list/booth-voter-list/:BoothNo/voter-survey/:VoterId' element={<SurveyForm/>} />
      </Routes>
    </Router>
    
    
    
  )
}

export default App
