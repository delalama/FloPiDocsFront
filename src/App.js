import React, { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import LoginForm from "./components/LoginFom";
import CollapsibleTable from "./components/DocumentsTable";
import { consoleValues, CleanLocalStorage } from "./State";

function App() {
  const [showTable, setShowTable] = useState(false);

  function handleOnUserLogin() {
    setShowTable(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={consoleValues}>ConsoleStateValues</button>
          <button onClick={CleanLocalStorage}>CleanLocalStorage</button>
          <AppBar />
          <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>
          {showTable && <CollapsibleTable />}
        </div>
        {/* <Users></Users> */}

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;
