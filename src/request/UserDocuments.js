import getEndpoints from './Endpoints';

export default function getUserDocuments() {
    const [searching , setSearching] = useState(false);
    const [users, setUsers] = useState([]);
  
    const query = getEndpoints('getAllDocumentsByUserId') + localStorage.getItem("userId");
    console.log(query);
    const getUsersEndpoint = "http://localhost:8080/user/getAllUsers";
    const usersAPIEndpoint = "https://jsonplaceholder.typicode.com/todos";
    useEffect(() => {
      setSearching(true);
      fetch(getUsersEndpoint)
        .then((response) => response.json())
        .then((users) => setUsers(users))
        .finally(() => setSearching(false));
    }, []);
  
    return { users, searching };
  }