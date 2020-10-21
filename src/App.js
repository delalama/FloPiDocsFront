import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Users from './Users';
import LoginForm from './components/LoginFom';
import CollapsibleTable from './components/DocumentsTable';
import values from './State';
import { consoleValues, CleanLocalStorage} from './State';
// TODO   https://use-http.com/#/

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {/* DEADVID, cómo hago que estas 2 funciones devuelven los estados presentes? */}
          <button onClick={consoleValues}>ConsoleStateValues</button>
          <button onClick={CleanLocalStorage}>CleanLocalStorage</button>
          {/* //DEADVID, me explicas esto?, todos los objetos tienen un "state" y sus getters/setters ? 
          https://jsfiddle.net/arve0/sxfz2tc0/ */}
          <AppBar>
          </AppBar>
          <LoginForm></LoginForm>

          /* //DEADVID , algo que controle los estados de las cosas, entiendo que tiene que ser sencillo si hay una capa que controla  */}
          /* estados, por ejemplo:
          si estoy loggeado muestras tal o cual , redux es para eso verdad? */
          
          <CollapsibleTable></CollapsibleTable>

        </div>
        {/* <Users></Users> */}

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
    
      </header>
    </div>
  );
}

export default App;
