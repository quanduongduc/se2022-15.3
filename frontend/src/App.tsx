import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/random">Testing api page</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/signin">Signin</Link>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
}

export default App;
