import './Home.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Todos from './Todos';
import AddTodo from './AddTodo';

function Home() {
    return (
        <div className="App">
            <div className='app-header'>
                <div>
                    <span style={{ paddingRight: '1rem' }}>Todo</span>
                    <span style={{ color: '#ffdc90' }}>App</span>
                </div>
                {/* <div>
                    <span style={{ paddingRight: '1rem' }}>- Designed by</span>
                    <span style={{ color: '#ffdc90' }}>pramath98</span>
                </div> */}
            </div>
            <AddTodo />
            <Todos />
        </div>
    );
}

export default Home;
