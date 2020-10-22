import React, { useEffect, useState } from "react";
import getEndPoint from './Endpoints';

function useDocumentFields(documentId) {
  const [searching, setSearching] = useState(false);
  const [fields, setFields] = useState([]);

  const query = getEndPoint("getFieldsByDocumentId") + documentId;

  useEffect(() => {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setFields, console.log())
      .finally(() => setSearching(false));
  }, []);

  return { fields, searching };
}
export default useDocumentFields;