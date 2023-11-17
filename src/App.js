import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Welcome from './components/Welcome';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
