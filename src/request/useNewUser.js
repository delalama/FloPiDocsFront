import getEndPoint from "../utilities/Endpoints";
import { useState, useEffect, useContext} from "react";
import { LoginFormContext } from '../components/LoginFom';

export default function useNewUser() {
  const [searching, setSearching] = useState(false);
  const [responseJson, setResponseJson] = useState();
  const [showSpinner, setShowSpinner ] = useState();
  const [mailIsAvailable, setMailIsAvailable ] = useState();
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

  function eraseForm(response) {
    console(response);
  }

  function createNewUser() {
    getNewUserForm(newUserForm);
    console.log(newUserForm);
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
      console.log('printError func');
      console.log(errorName);
      const message = document.getElementById("message");
      message.innerHTML = errorName;
    }

    function handleErrors(response) {
      console.log(response);
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

    function nextStep(data){
      toogleForm();
    }

    setSearching(true);

    fetch(endPoint, requestOptions)
      .then((res) => res.json() )
      .then( data => {nextStep(data); console.log(data)})
      .catch( err => console.log(err))
    
      setSearching(false);
  }

  function handleResponse(response) {
    console.log(response);
    //  if (response.status === 200) {
    //    hideForm()}
    //    else eraseForm(response);
  }

  function checkEmailAlreadyExists(){
    setMailIsAvailable(true);

    var email =document.getElementById("newUserEmail").value;
    const endpoint = getEndPoint("emailAlreadyExists");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {email: email}),
    };
    
    fetch(endpoint, requestOptions)
    .then( res => setMailIsAvailable(!res.ok))
    .catch( e => onError(e));

    function onError(err){
      console.log(err);
    }
  }

  function createUser() {
    setShowSpinner(true);
    checkEmailAlreadyExists();

    setTimeout( () => {
      if(mailIsAvailable){
        createNewUser();
      }
    }, 1200);
    
    setShowSpinner(false);
  }

  return { responseJson, searching, checkMailAvailability: createUser , showSpinner};
}
