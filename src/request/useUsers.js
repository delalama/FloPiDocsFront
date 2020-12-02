import User from "./useUsers.js";
import getEndpoint from "../utilities/Endpoints";
import React, { useState, useEffect } from "react";

export default function useUsers() {
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsersEndpoint = "http://localhost:8080/user/getAllUsers";

  useEffect(() => {
    setSearching(true);
    fetch(getUsersEndpoint)
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .finally(() => setSearching(false));
  }, []);


  function deleteUserAccount() {
    const endpoint = getEndpoint("User");

    const query = endpoint + localStorage.getItem("userId");

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(query, requestOptions)
    .then(console.log("Account deleted"))
  }
  
  return { users, searching, deleteUserAccount };
}

