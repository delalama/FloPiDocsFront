import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocuments() {
  const [searching, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);

  const query =
    getEndPoint("getAllDocumentsByUserId") + localStorage.getItem("userId");

  function fetchDocuments() {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments, console.log())
      .finally(() => setSearching(false));
  }

  useEffect(() => {
    fetchDocuments();
  },[]);

  function refresh() {
    setTimeout(fetchDocuments, 500);
  }

  function getDocumentsByText(text){
    var text = document.getElementById('searchBar').value;
    console.log(text);

    if(text.length > 0){
      
      var userId = localStorage.getItem('userId');
      // TODO implementar aquí la búsqueda de docs!!
      console.log('buscando');
    }
    
      // console.log(event.target);
  }

  function clear() {
    setDocuments([]);
  }
  return { documents, searching, refresh, clear, getDocumentsByText };
}
export default useDocuments;
