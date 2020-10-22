import React, { useEffect, useState } from "react";
import getEndPoint from './Endpoints';

function useDocuments() {
  const [searching, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);

  const query = getEndPoint("getAllDocumentsByUserId") + localStorage.getItem('userId');

  useEffect(() => {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments, console.log())
      .finally(() => setSearching(false));
  }, []);

  return { documents, searching };
}
export default useDocuments;