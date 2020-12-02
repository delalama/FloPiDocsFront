import getEndPoint from "../utilities/Endpoints";

function useSaveFields(fieldName, fieldValue, documentId) {
  function save(fieldName, fieldValue, documentId){
    const query = getEndPoint("saveField");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fieldName: fieldName,
        fieldValue: fieldValue,
        documentId: documentId,
      }),
    };
  
    fetch(query, requestOptions)
      .then((response) => response.json())
      .finally(console.log("field Saved"));
  
  }
  
  function savePicture(fieldName, fieldPicture, documentId){
    const query = getEndPoint("saveField");
//TODO ACTUAL, PENSAR COMO GUARDAR LA FOTO
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fieldName: fieldName,
        fieldPicture: fieldPicture,
        documentId: documentId,
      }),
    };
  
    fetch(query, requestOptions)
      .then((response) => response.json())
      .finally(console.log("field Saved"));
  
  }

  function UpdateFields(fieldDto) {
    console.log(fieldDto);
    const query = getEndPoint("field");

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldDto),
    };

    fetch(query, requestOptions)
      .then((response) => response.json())
      .finally(console.log("field updated"));
  }

  return { save, savePicture,UpdateFields };
}       
export default useSaveFields;

