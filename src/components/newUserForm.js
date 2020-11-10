import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import StringsFloPi from "./StringsFloPi";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { LoginFormContext } from "./LoginFom";
import isBirel from "../utilities/isBirel";
import useNewUser from "./../request/useNewUser";
import { newUserFormStyles } from "./newUserFormStyles.js";
import ValidateEmail from "../utilities/ValidateMail";
import CircularIndeterminate from "./CircularIndeterminate";

const useStyles = newUserFormStyles;

export default function NewUserForm() {
  //styles and context
  const newUserFormclasses = useStyles();
  const [
    displayNewUserFormSendButton,
    setDisplayNewUserFormSendButton,
  ] = useState(false);

  var { toogleForm } = useContext(LoginFormContext);

  function checkChecksStatus() {
    // TODO useRed
    var firstNameCheckIcon =
      document.getElementById("newUserFirstNameOkIcon").style.display ===
      "inline-block";
    var lastNameCheckIcon =
      document.getElementById("newUserLastNameOkIcon").style.display ===
      "inline-block";
    var emailIcon =
      document.getElementById("newUserEmailOkIcon").style.display ===
      "inline-block";
    var passwordCheckIcon =
      document.getElementById("newUserPasswordOkIcon").style.display ===
      "inline-block";

    var arrayChecks = [
      firstNameCheckIcon,
      lastNameCheckIcon,
      emailIcon,
      passwordCheckIcon,
    ];

    if (arrayChecks.every((value) => value === true)) {
      displaySendButton();
    }
  }

  function displaySendButton() {
    setDisplayNewUserFormSendButton(true);
  }

  function onChangeFieldText(event) {
    var value = event.target.value;
    var targetId = event.target.id;
    isBirel(value);
    if (value.length > 0) {
      document.getElementById(targetId + "OkIcon").style.display =
        "inline-block";
      checkChecksStatus();
    } else {
      document.getElementById(targetId + "OkIcon").style.display = "none";
      checkChecksStatus();
    }
  }

  function onChangeEmailText(event) {
    var value = event.target.value;
    var targetId = event.target.id;
    isBirel(value);
    if (value.length > 0 && ValidateEmail(value)) {
      document.getElementById(targetId + "OkIcon").style.display =
        "inline-block";
      checkChecksStatus();
    } else {
      document.getElementById(targetId + "OkIcon").style.display = "none";
      checkChecksStatus();
    }
  }

  function resetForm() {
    document.getElementById("newUserFirstName").value = "";
    document.getElementById("newUserLastName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPassword").value = "";

    document.getElementById("newUserFirstNameOkIcon").style.display = "none";
    document.getElementById("newUserLastNameOkIcon").style.display = "none";
    document.getElementById("newUserEmailOkIcon").style.display = "none";
    document.getElementById("newUserPasswordOkIcon").style.display = "none";
  }

  const { response, searching, createUser, showSpinner } = useNewUser();

  return (
    <List>
      <form
        className={newUserFormclasses.dataForm}
        noValidate
        autoComplete="off"
      >
        <ListItem className={newUserFormclasses.dataForm}>
          <TextField
            id="newUserFirstName"
            label={StringsFloPi.firstName}
            onChange={onChangeFieldText}
          />
          <CheckIcon
            id="newUserFirstNameOkIcon"
            className={newUserFormclasses.check}
          ></CheckIcon>
        </ListItem>

        <ListItem className={newUserFormclasses.dataForm}>
          <TextField
            id="newUserLastName"
            label={StringsFloPi.lastName}
            onChange={onChangeFieldText}
          />
          <CheckIcon
            id="newUserLastNameOkIcon"
            className={newUserFormclasses.check}
          ></CheckIcon>
        </ListItem>

        <ListItem className={newUserFormclasses.dataForm}>
          <TextField
            id="newUserEmail"
            label={StringsFloPi.email}
            onChange={onChangeEmailText}
          />
          <CheckIcon
            id="newUserEmailOkIcon"
            className={newUserFormclasses.check}
          ></CheckIcon>
          {showSpinner && <CircularIndeterminate></CircularIndeterminate>}
        </ListItem>

        <ListItem className={newUserFormclasses.dataForm}>
          <TextField
            id="newUserPassword"
            label={StringsFloPi.password}
            onChange={onChangeFieldText}
          />
          <CheckIcon
            id="newUserPasswordOkIcon"
            className={newUserFormclasses.check}
          ></CheckIcon>
        </ListItem>
      </form>

      {displayNewUserFormSendButton && (
        <div>
          <Button
            color="primary"
            className={newUserFormclasses.sendButton}
            onClick={() => createUser()}
          >
            NEW USER
          </Button>
        </div>
      )}

      <Button
        id="toogleButton"
        className={newUserFormclasses.resetButton}
        color="primary"
        onClick={() => resetForm()}
      >
        RESET
      </Button>
      <Button
        id="toogleButton"
        className={newUserFormclasses.toogleButton}
        color="primary"
        onClick={() => toogleForm()}
      >
        LOGIN
      </Button>
    </List>
  );
}
