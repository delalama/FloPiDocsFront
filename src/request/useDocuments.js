import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocuments() {
  const [searchingDocuments, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState([]);

  const query =
    getEndPoint("getAllDocumentsByUserId") + localStorage.getItem("userId");

  function fetchDocuments() {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments, console.log())
      .finally(() => console.log());
    setSearching(false);
  }

  useEffect(() => {
    // fetchDocuments();
  }, []);

  function refresh() {
    setTimeout(() => {
      fetchDocuments();
    }, 500);
  }

  function deleteDocument(documentDto) {
    const endPoint = getEndPoint("document");

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentDto),
    };

    setSearching(true);
    fetch(endPoint, requestOptions)
      .then((response) => response.json())
      .then(setDeleteResponse)
      .finally(() => refresh());
    setSearching(false);
  }

  function getDocumentsByText(props) {
    console.log("getDocusByText, props: ");
    console.log(props);
    var text = document.getElementById("searchBar").value;
    console.log(text);

    if (text.length > 0) {
      setSearching(true);
      var userId = localStorage.getItem("userId");
      var endPoint = "";
      if (props === "TITLE") {
        endPoint = getEndPoint("findByTitle");
      } else if (props === "PURPOSE") {
        endPoint = getEndPoint("findByPurpose");
      } else if (props === "TAG") {
        endPoint = getEndPoint("findByTag");
      }
      console.log(endPoint);
      var params = "?userId=" + userId + "&key=" + text;
      var query = endPoint + params;
      console.log("buscando");
      fetch(query)
        .then((response) => response.json())
        .then(setDocuments, console.log())
        .finally(() => setSearching(false));
    } else {
      refresh();
    }

    // console.log(event.target);
  }

  function updateDocument(documentDto) {
    const endPoint = getEndPoint("document");

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentDto),
    };

    setSearching(true);
    fetch(endPoint, requestOptions)
      .then((response) => response.json())
      .then(setDeleteResponse)
      .finally(() => refresh());

    return deleteResponse;
  }

  function clear() {
    setDocuments([]);
  }
  return {
    documents,
    searchingDocuments,
    refresh,
    clear,
    getDocumentsByText,
    updateDocument,
    deleteDocument,
  };
}
export default useDocuments;
