import React from 'react'
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route,Routes} from 'react-router-dom';
import Register from './pages/Register';


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/lessons' element={<Lessons/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
