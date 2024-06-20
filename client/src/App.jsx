import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        {/* here we have used concept of Outlet see HeaderComponent and PrivateRoute component to gate clear idea */}
        <Route element={<PrivateRoute/>} >
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App