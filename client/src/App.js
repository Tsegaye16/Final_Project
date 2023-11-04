import './App.css';
import NavBar from './components/navBar/NavBar.js';
import Home from './pages/homePage/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import Contact from './pages/contactPage/Contact';
import About from './pages/aboutPage/About';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      
      <NavBar></NavBar>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
