import getEndPoint from "../utilities/Endpoints";
import { DocumentDtoNoIdAndDate } from "../classes/document";

function SaveDocuments(title, purpose, content) {
  const userId = localStorage.getItem("userId");
  const query = getEndPoint("document");
  const documentDto = new DocumentDtoNoIdAndDate(
    userId,
    title,
    purpose,
    content
  );
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(documentDto),
  };

  fetch(query, requestOptions)
    .then((response) => response.json())
    .finally(console.log("documentSaved"));
}

export default SaveDocuments;
