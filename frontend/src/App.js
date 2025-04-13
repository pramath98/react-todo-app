import './App.css';
import './index.css';
import "primereact/resources/themes/arya-orange/theme.css";
// import "primereact/resources/themes/lara-dark-indigo/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Login';
import LandingPage from './landingPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
        <Header/>
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
