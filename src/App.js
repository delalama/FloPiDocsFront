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
  searchingDocuments: Boolean,
  deleteDocument: () => {},
});

export const SearchContext = createContext({
  search: String,
});

function App() {
  const [showTable, setShowTable] = useState(false);
  const {
    documents,
    searchingDocuments,
    refresh,
    clear,
    getDocumentsByText,
    deleteDocument,
  } = useDocuments();

  const search = (prop) => {
    getDocumentsByText(prop);
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
            {showTable && <AppBar refreshTable={refresh} />}
          </SearchContext.Provider>

          <DocumentsContext.Provider
            value={{
              documents,
              refresh,
              clear,
              deleteDocument,
            }}
          >
            {!showTable && (
              <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>
            )}

            {showTable && (
              <>
                <CollapsibleTable searching={searchingDocuments} />
              </>
            )}
          </DocumentsContext.Provider>
        </div>
      </header>
    </div>
  );
}

export default App;

// TODO aprender userRef para sustituir todos los "getElementById"
