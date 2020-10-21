import getEndpoints from "./Endpoints";

export default function useDocuments() {
  const [searching, setSearching] = useState(false);
  const [documents, setDocuments] = useState([]);

  const query =
    getEndpoints("getAllDocumentsByUserId") + localStorage.getItem("userId");

  useEffect(() => {
    setSearching(true);
    fetch(query)
      .then((response) => response.json())
      .then(setDocuments)
      .finally(() => setSearching(false));
  }, []);

  return { documents, searching };
}
