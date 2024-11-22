import React from 'react'
import Login from './login'
import RegisterPage from './register'
import Homepage from './homepage'
import TIcketBookingForm from './onlineticket'
 import SmartCardRegisterForm from './Smartcardregister'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <Router> 
      <div> 
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/homepage' element={<Homepage/>}></Route>
          <Route path='/onlineticket' element={<TIcketBookingForm/>}></Route>
          <Route path='/Smartcardregister' element={< SmartCardRegisterForm/>}></Route>
           
        </Routes>
      </div>  
      </Router>
  )

}

export default App;