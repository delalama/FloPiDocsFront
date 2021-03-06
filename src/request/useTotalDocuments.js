import  { useEffect, useState } from "react";
import getEndPoint from "../utilities/Endpoints";

function useTotalDocuments() {
  const [searching, setSearching] = useState(false);
  const [count, setCount] = useState([]);

  const query = getEndPoint("countByUserId") + localStorage.getItem('userId');

  useEffect(() => {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then((response) => {
        setCount(response);
      })
      .finally(() => setSearching(false));
  }, []);
  return { count, searching };
}
export default useTotalDocuments;
