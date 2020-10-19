import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Users from './Users';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AppBar>
          </AppBar>
        </div>
        <Users></Users>

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
    
      <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
