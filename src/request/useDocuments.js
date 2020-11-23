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
      .then(setDocuments)
      .finally(() => console.log());
    setSearching(false);
  }

  useEffect(() => {
    // fetchDocuments();
  }, []);

  function refresh() {
    setTimeout(() => {
      fetchDocuments();
    }, 100);
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
    var text = document.getElementById("searchBar").value;

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
      var params = "?userId=" + userId + "&key=" + text;
      var query = endPoint + params;
      fetch(query)
        .then((response) => response.json())
        .then(setDocuments)
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

  function SaveDocuments(title, purpose, content) {
    const query =
      getEndPoint("saveDocument") +
      localStorage.getItem("userId") +
      "&title=" +
      title +
      "&purpose=" +
      purpose +
      "&content=" +
      content;
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "saveDocument" }),
    };
  
    fetch(query, requestOptions)
      .then((response) => response.json())
      .finally(refresh);
  }
  
  function UpdateDocument(props) {
    console.log(props)
    const query =
      getEndPoint("document");
  
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    };
  
    fetch(query, requestOptions)
      .then((response) => response.json())
      .finally(console.log("documentSaved"));
  }
  return {
    documents,
    searchingDocuments,
    refresh,
    clear,
    getDocumentsByText,
    updateDocument,
    deleteDocument,
    SaveDocuments
  };
}
export default useDocuments;
