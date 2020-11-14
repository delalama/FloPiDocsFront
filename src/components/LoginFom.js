import React, { useState, createContext, useCallback, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useFetch, { Provider } from "use-http";
import getEndPoint from "../utilities/Endpoints";
import NewUserForm from "./newUserForm";
import isBirel from "../utilities/isBirel";
import Dictionary from "./StringsFloPi";
import Divider from "@material-ui/core/Divider";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);
export var LoginFormContext = createContext({
  toogleForm: () => {},
});

export default function LoginForm2({ onUserLogin }) {
  const classes = useStyles();
  const values = {
    email: "",
    password: "",
  };

  function setEmail(email) {
    isBirel(email);
    values.email = email;
  }

  function setPassword(password) {
    values.password = password;
  }

  const messageStyle = {
    color: "black",
  };
  const sendButtonStyle = {
    background: "#3f51b5",
    color: "White",
  };

  function setClose(userId) {
    // DEAD!!
    onUserLogin && onUserLogin(userId);
  }
  // TODO se sigue manteniendo el userId en localStorage la primera vez que se crea el usuario y loguea
  function resolveQuery(response) {
    console.log(response);
    var userId = response.userId;
    if (userId !== "" && userId !== undefined) {
      localStorage.setItem("userId", userId);
      var firstName = response.firstName;
      localStorage.setItem("userName", firstName);

      // setTimeout( setClose, 500 );
      setClose();

      // // // // visualizar elementos once looged
      // var arrayOfElements = document.getElementsByClassName("loggedOptions");
      // var lengthOfArray = arrayOfElements.length;
      // for (var i = 0; i < lengthOfArray; i++) {
      //   arrayOfElements[i].style.display = "flex";
      // }
    } else {
      document.getElementById("loginForm").reset();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.email !== "" && values.password !== "") {
      const query = getEndPoint("login");

      const email = values.email;
      const password = values.password;

      fetch(query, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(
          (response) => resolveQuery(response) //DEADVID, solo ejecturar resolveQuery when 200
          //   ,(error) => {
          //     // console.log(error);
          //   }
        );
    }
  }

  const [toogleFormsDisplay, setToogleFormsDisplay] = useState(true);

  const toogleForm = () => {
    setToogleFormsDisplay(!toogleFormsDisplay);
  };

  return (
    <div id="loginDiv">
      <LoginFormContext.Provider
        value={{
          toogleForm,
        }}
      >
        {/* <div>
        <h1 style={{ color: "red", fontSize: "4em" }}>{Dictionary.appName}</h1>
      </div> */}

        <div>
          <Image src={require("./../images/5.png")} />
        </div>

        <div style={messageStyle}>
          <h1 id="message"></h1>
        </div>
        {toogleFormsDisplay && (
          <form id="loginForm" onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                id="email"
                label="email"
                color="primary"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                required
                type="password"
                id="password"
                label="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button
              style={sendButtonStyle}
              color="primary"
              className={classes.button}
              type="submit"
              value="submit"
            >
              Send
            </Button>
            <Divider orientation="vertical" />
            <Button
              style={sendButtonStyle}
              color="primary"
              className={classes.button}
              onClick={() => toogleForm()}
            >
              NEW USER
            </Button>
          </form>
        )}
        {!toogleFormsDisplay && <NewUserForm></NewUserForm>}
      </LoginFormContext.Provider>
    </div>
  );
}
