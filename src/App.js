import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import ProtectedRoutes from './Services/ProtectedRoutes'
import Contect from './Pages/Contact'
import Sidebar from './Pages/Sidebar'
import Navbar from './Pages/Navbar'
const App = () => {
  return (
   <>
   <BrowserRouter>
   {/* <Sidebar/> */}
   {/* <Navbar/> */}
   <Routes>
    <Route path='/login'element={<Login/>}/>
    <Route path='/register'element={<Register/>}/>
    <Route path='/' element={<ProtectedRoutes/>}>
    <Route path='/'element={<Home/>}/>
    <Route path='/Contact'element={<Contect/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App