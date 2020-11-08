import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocumentFields(documentId) {
  const [searching, setSearching] = useState(false);
  const [fields, setFields] = useState([]);

  const query = getEndPoint("getFieldsByDocumentId") + documentId;

  function getFields() {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then((response) => {
        setFields(response);
        console.log(response);
      })
      .finally(() => setSearching(false));
  }

  useEffect(() => {
    getFields();
  }, []);

  function refresh() {
    getFields();
  }
  return { fields, searching , refresh };
}
export default useDocumentFields;
