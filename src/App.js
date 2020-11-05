import React, { useState, createContext, useContext, useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import LoginForm from "./components/LoginFom";
import CollapsibleTable from "./components/DocumentsTable";
import useDocuments from "./request/useDocuments";

export const DocumentsContext = createContext({
  documents: [],
  refresh: () => {},
  clear: () => {},
});

export const SearchContext = createContext({
  search: String,
});

function App() {
  const [showTable, setShowTable] = useState(false);
  const {
    documents,
    searching,
    refresh,
    clear,
    getDocumentsByText,
  } = useDocuments();

  // useEffect(() => {
  //   console.log(`searchUseefecct`);
  // }, [search]);

  // function search(Event){
  //     console.log('search from app');
  // }

  const search = () => {
    getDocumentsByText();
  };

  function handleOnUserLogin() {
    setShowTable(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
         <SearchContext.Provider
            value={{
              search,
            }}
          >
           {showTable &&  <AppBar refreshTable={refresh} />}
          </SearchContext.Provider>

          <DocumentsContext.Provider
            value={{
              documents,
              refresh,
              clear,
            }}
          >
            <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>

            {showTable && (
              <>
                <CollapsibleTable searching={searching} />
              </>
            )}
          </DocumentsContext.Provider>
        </div>
      </header>
    </div>
  );
}

export default App;
