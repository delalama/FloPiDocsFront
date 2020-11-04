import React, { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import LoginForm from "./components/LoginFom";
import CollapsibleTable from "./components/DocumentsTable";
import { consoleValues, CleanLocalStorage } from "./State";
import useDocuments from "./request/useDocuments";

function App() {
  const [showTable, setShowTable] = useState(false);
  const { documents, searching, refresh } = useDocuments();

  function handleOnUserLogin() {
    setShowTable(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>

          // TODO quitar cadáver
          {/* <button onClick={consoleValues}>ConsoleStateValues</button>
          <button onClick={CleanLocalStorage}>CleanLocalStorage</button>
          <button onClick={handleOnUserLogin}>Desaparece tabla</button> */}

          <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>

          {/* <AppBar refreshTable={() => refresh()} /> */}
          {showTable && (
            <AppBar refreshTable={() => refresh()} />
          )}
          {showTable && (
            <CollapsibleTable documents={documents} searching={searching} />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
