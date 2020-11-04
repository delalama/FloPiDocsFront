import  { useEffect, useState } from "react";
import getEndPoint from "./Endpoints";

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
        console.log(response);
      })
      .finally(() => setSearching(false));
  }, []);
  return { count, searching };
}
export default useTotalDocuments;
