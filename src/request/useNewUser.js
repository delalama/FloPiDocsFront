import getEndPoint from "../utilities/Endpoints";
import { useState, useEffect, useContext } from "react";
import { LoginFormContext } from "../components/LoginFom";

export default function useNewUser() {
  const [searching, setSearching] = useState(false);
  const [responseJson, setResponseJson] = useState();
  const [showSpinner, setShowSpinner] = useState();
  var { toogleForm } = useContext(LoginFormContext);

  var newUserForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  function getNewUserForm() {
    newUserForm.firstName = document.getElementById("newUserFirstName").value;
    newUserForm.lastName = document.getElementById("newUserLastName").value;
    newUserForm.email = document.getElementById("newUserEmail").value;
    newUserForm.password = document.getElementById("newUserPassword").value;
  }

  function hideForm() {
    document.getElementById("toogleButton").click();
  }

  function createNewUser() {
    getNewUserForm(newUserForm);
    const endPoint = getEndPoint("newUser");

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: newUserForm.firstName,
        lastName: newUserForm.lastName,
        email: newUserForm.email,
        password: newUserForm.password,
      }),
    };

    function printError(errorName) {
      const message = document.getElementById("message");
      message.innerHTML = errorName;
    }

    function handleErrors(response) {
      var resStatus = response.status;
      switch (resStatus) {
        case 400:
          printError("INVALID EMAIL");
          break;
        case 409:
          printError("EXISTING EMAIL");
          break;
        default:
          break;
      }
      return response;
    }

    function nextStep(data) {
      toogleForm();
    }

    fetch(endPoint, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        nextStep(data);
      })
      .catch((err) => console.log(err))
      .finally();

    setSearching(false);
  }

  function checkEmailAlreadyExists() {
    var email = document.getElementById("newUserEmail").value;
    const endpoint = getEndPoint("emailAlreadyExists");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:  email ,
    };

    return fetch(endpoint, requestOptions)
      .then((res) => res.ok )
      .catch(console.log);
  }

  function createUser() {
    setShowSpinner(true);
    checkEmailAlreadyExists()
      .then((available) => available && createNewUser())
      .catch()
      .finally(() => setShowSpinner(false));
  }

  return { responseJson, searching, createUser, showSpinner };
}
