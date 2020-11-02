import query, { useEffect, useState } from "react";
import getEndPoint from "./Endpoints";

function useDocuments() {
  const [searching, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);

  const query =
    getEndPoint("getAllDocumentsByUserId") + localStorage.getItem("userId");

  const a = () => {
    setDocuments([]);

    setSearching();
  };

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
    fetchDocuments();
  }

  return { documents, searching, refresh };
}
export default useDocuments;
