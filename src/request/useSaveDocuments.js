import getEndPoint from "../utilities/Endpoints";

function SaveDocuments(title, purpose, content) {
  const query =
    getEndPoint("saveDocument") +
    localStorage.getItem("userId") +
    "&title=" +
    title +
    "&purpose=" +
    purpose +
    "&content=" +
    content;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "saveDocument" }),
  };

  fetch(query, requestOptions)
    .then((response) => response.json())
    .finally(console.log("documentSaved"));
}

export default SaveDocuments;
