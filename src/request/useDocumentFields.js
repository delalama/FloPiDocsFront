import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useDocumentFields() {
  const [searching, setSearching] = useState(false);
  const [fields, setFields] = useState([]);

  
  function getFields(id) {
    const query = getEndPoint("getFieldsByDocumentId") + id;
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then((response) => {
        setFields(response);
      })
      .finally(() => setSearching(false));
  }

  useEffect(() => {
    getFields();
  }, []);

  function refreshFields(id) {
    getFields(id);
  }
  return { fields, searching , refreshFields };
}
export default useDocumentFields;
