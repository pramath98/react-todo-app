import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Login';
import LandingPage from './landingPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
