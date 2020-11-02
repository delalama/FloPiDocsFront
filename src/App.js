import React, { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import LoginForm from "./components/LoginFom";
import CollapsibleTable from "./components/DocumentsTable";
import { consoleValues, CleanLocalStorage } from "./State";

function App() {
  const [showTable, setShowTable] = useState(false);
  const [tableState, setTableState] = useState(false);

  function handleOnUserLogin() {
    setShowTable(true);
  }

  function onRefreshtable(){
    console.log('refreshed from app.js!');
    setTableState(true);
    console.log(tableState);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={consoleValues}>ConsoleStateValues</button>
          <button onClick={CleanLocalStorage}>CleanLocalStorage</button>
          <AppBar refreshTable={onRefreshtable}/>

          <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>
          <button onClick={handleOnUserLogin}>Desaparece tabla</button>
          {showTable && <CollapsibleTable refreshTable={tableState}/>}
        </div>
      </header>
    </div>
  );
}

export default App;
