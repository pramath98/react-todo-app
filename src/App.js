import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <div className='app-header'>
        <div>
          <span style={{ paddingRight: '1rem' }}>Todo</span>
          <span style={{ color: '#ffdc90' }}>App</span>
        </div>
        <div>
          <span style={{ paddingRight: '1rem' }}>- Designed by</span>
          <span style={{ color: '#ffdc90' }}>pramath98</span>
        </div>
      </div>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
