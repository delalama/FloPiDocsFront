import { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useTags(documentId) {
  const [tags, setTags] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    fetchTags();
  }, [searching]);
  const docId = documentId;

  function fetchTags() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const query = getEndPoint("tag") + "?documentId=" + docId;
    fetch(query, requestOptions)
      .then((response) => response.json())
      .then(setTags)
      .finally();
  }

  function deleteTagById(tagId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const query = getEndPoint("tag") + "?tagId=" + tagId;
    setSearching(true);
    fetch(query, requestOptions)
    .then((response) => response.json())
    .then( v => setTags( tags.filter(tag => tag.tagId !== v.tagId))) 
    .finally(setSearching(true));
  }

  async function createTag(tagDto) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tagDto),
    };

    const query = getEndPoint("tag");

    await fetch(query, requestOptions)
    .then((response) => response.json())
    .then( v => setTags(tags =>[...tags,v])) 
  }

  return { tags, searching, fetch, deleteTagById ,createTag};
}
export default useTags;
