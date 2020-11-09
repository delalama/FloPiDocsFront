import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocuments() {
  const [searchingDocuments, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);

  const query =
    getEndPoint("getAllDocumentsByUserId") + localStorage.getItem("userId");

  function fetchDocuments() {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments, console.log())
      // .finally(() => setSearching(false));
      .finally(() => console.log());
    setTimeout(() => console.log("hola"), 4000);
    // setTimeout( () => setSearching(false), 4000);
  }

  useEffect(() => {
    // fetchDocuments();
  }, []);

  function refresh() {
    setTimeout(() => {
      fetchDocuments();
    }, 500);
  }

  function getDocumentsByText(text) {
    var text = document.getElementById("searchBar").value;
    console.log(text);

    if (text.length > 0) {
      // DEADVID , esto tiene que ser un get y pasar KEY y USERID por requestparam? , es que FETCH() no permite hacer GETS con body....
      setSearching(true);
      var userId = localStorage.getItem("userId");
      var endPoint = getEndPoint("findByTitleAndPurposeContains");
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
  return { documents, searchingDocuments, refresh, clear, getDocumentsByText };
}
export default useDocuments;
