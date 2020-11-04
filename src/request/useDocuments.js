import { useEffect, useState } from "react";
import getEndPoint from "./Endpoints";

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
  }, []);

  function refresh() {
    setTimeout(function(){ fetchDocuments(); }, 500);
  }

  return { documents, searching, refresh };
}
export default useDocuments;
