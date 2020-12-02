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
  
  async function exportDocument(id) {
    const query = getEndPoint("exportDocument") + id;
    let pdf = Blob ;
    setSearching(true);
    await fetch(query)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "flopidoc.pdf";
        a.click();
    });
  })
  }

  useEffect(() => {
    getFields();
  }, []);

  function refreshFields(id) {
    getFields(id);
  }
  return { fields, searching , refreshFields, exportDocument };
}
export default useDocumentFields;
