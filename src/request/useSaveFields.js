import getEndPoint from "../utilities/Endpoints";

//DEADVID -> HACERLO CON useEffect.........desde donde llamaría useSaveDocuments?
function SaveFields(fieldName, fieldValue, documentId) {
  const query =
    getEndPoint("saveField");

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fieldName: fieldName, fieldValue: fieldValue, documentId: documentId }),
  };

  fetch(query, requestOptions)
    .then((response) => response.json())
    .finally(console.log("field Saved"));
}
export default SaveFields;
