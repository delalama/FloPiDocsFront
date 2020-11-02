import query, { useEffect, useState } from "react";
import getEndPoint from "./Endpoints";

//DEADVID -> HACERLO CON useEffect.........desde donde llamaría useSaveDocuments?
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
    body: JSON.stringify({ title: "React POST Request Example" }),
  };

  fetch(query, requestOptions)
    .then((response) => response.json())
    .finally(console.log("documentSaved"));
}
export default SaveDocuments;
// const [searching, setSearching] = useState(false);
// const [documents, setDocuments] = useState([]);

// const query = getEndPoint("getAllDocumentsByUserId") + localStorage.getItem('userId');

// const a = () => {
//   setDocuments([]);

//   setSearching();
// }

// useEffect(() => {
//   setSearching(true);
//   fetch(query)
//     .then((response) => response.json())
//     .then(setDocuments, console.log())
//     .finally(() => setSearching(false));
// }, []);

// return { documents, searching };
