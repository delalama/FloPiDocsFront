import React, { useState, createContext, useContext, useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import LoginForm from "./components/LoginFom";
import MainTable from "./components/DocumentsTable";
import useDocuments from "./request/useDocuments";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useMediaQuery } from "react-responsive";

export const DocumentsContext = createContext({
  documents: [],
  refresh: () => {},
  clear: () => {},
  searchingDocuments: Boolean,
  deleteDocument: () => {},
  updateDocument: () => {},
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
    updateDocument,
    SaveDocuments,
  } = useDocuments();

  const search = (prop) => {
    getDocumentsByText(prop);
  };

  function handleOnUserLogin() {
    setShowTable(true);
  }

  function logOut() {
    setShowTable(false);
  }

  const isMobileVertical = useMediaQuery({ maxWidth: 550 });

  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <div>
            <SearchContext.Provider
              value={{
                search,
              }}
            >
              {showTable && !isMobileVertical &&(
                <AppBar refreshTable={refresh} logOut={() => logOut()} />
              )}
            </SearchContext.Provider>

            <DocumentsContext.Provider
              value={{
                documents,
                refresh,
                clear,
                deleteDocument,
                updateDocument,
                SaveDocuments,
              }}
            >
              {!showTable && (
                <LoginForm onUserLogin={handleOnUserLogin}></LoginForm>
              )}

              {showTable && (
                <>
                  <MainTable
                    searching={searchingDocuments}
                    refresh={() => refresh()}
                  />
                </>
              )}
            </DocumentsContext.Provider>
          </div>
        </Container>
      </header>
      <div></div>
    </div>
  );
}

export default App;

