import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocuments() {
  const [searchingDocuments, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState([]) ;

  const query = getEndPoint("getAllDocumentsByUserId") + localStorage.getItem("userId");

  function fetchDocuments() {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments, console.log())
      .finally(() => console.log());
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
    console.log('delete document: ', documentDto);

    const endPoint = getEndPoint("document");

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body:  JSON.stringify( documentDto ),
      // body:  { id: documentDto.id, userId: documentDto.userId },
    };
    setSearching(true);
    fetch(endPoint, requestOptions)
      .then((response) => response.json())
      .then( setDeleteResponse)
      .finally(() => refresh()) ;

    return deleteResponse;
  }

  function getDocumentsByText(props) {
    console.log(props);
    var text = document.getElementById("searchBar").value;
    console.log(text);

    if (text.length > 0) {
      // DEADVID , esto tiene que ser un get y pasar KEY y USERID por requestparam? , es que FETCH() no permite hacer GETS con body....
      setSearching(true);
      var userId = localStorage.getItem("userId");
      var endPoint = "";
      props ?  endPoint = getEndPoint("findByTitle") : endPoint = getEndPoint("findByPurpose");
      console.log(endPoint);
      var params = "?userId=" + userId + "&key=" + text;
      var query = endPoint + params;
      console.log("buscando");
      fetch(query)
        .then((response) => response.json())
        .then(setDocuments, console.log())
        .finally(() => setSearching(false));
    }else{ 
      refresh()
    }

    // console.log(event.target);
  }

  function clear() {
    setDocuments([]);
  }
  return { documents, searchingDocuments, refresh, clear, getDocumentsByText, deleteDocument };
}
export default useDocuments;
