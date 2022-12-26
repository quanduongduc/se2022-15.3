import { Link } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div>
            <div>
                <ul>
                    <li>
                        <Link to="/login">Login page</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default App;
