// import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'; // Import your React component

function App() {
    return (
        <div>
            <h1>Your React App in Laravel</h1>
            <Login /> {/* Render your React component */}
        </div>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
