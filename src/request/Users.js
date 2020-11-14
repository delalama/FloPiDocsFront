import User from './../request/Users.js'
import getEndpoint from '../utilities/Endpoints';

export default function useUsers() {
    const [searching , setSearching] = useState(false);
    const [users, setUsers] = useState([]);
  
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

  // TODO  USAR ESTA FUNCIÓN EN EL LOGIN
  export default function login(obj) {
    const [searching , setSearching] = useState(false);
    const [user, setUser] = useState([]);
  
    const endpoint = getEndpoint(login);
  
    const query = endpoint ;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: obj.email , password: obj.password}),
    };

    useEffect(() => {
      setSearching(true);
      fetch(getUsersEndpoint)
        .then((response) => response.json())
        .then((user) => setUser(users))
        .finally(() => setSearching(false));
    }, []);
  
    return { users, searching };
  }
  