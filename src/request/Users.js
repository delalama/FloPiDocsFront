import User from './../request/Users.js'
import getEndpoint from './../request/Endpoints';

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
    const params = "?email=" + obj.email + "&password=" + obj.password;
    const query = endpoint + params;

    useEffect(() => {
      setSearching(true);
      fetch(getUsersEndpoint)
        .then((response) => response.json())
        .then((user) => setUser(users))
        .finally(() => setSearching(false));
    }, []);
  
    return { users, searching };
  }
  