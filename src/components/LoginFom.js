import React, { useState, createContext, useCallback, useEffect } from "react";
import { createStyles, makeStyles, StylesProvider, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useFetch, { Provider } from "use-http";
import getEndPoint from "../utilities/Endpoints";
import NewUserForm from "./newUserForm";
import isBirel from "../utilities/isBirel";
import Dictionary from "./StringsFloPi";
import Divider from "@material-ui/core/Divider";
import Image from "material-ui-image";
import Container from 'react-bootstrap/Container';
import { Height } from '@material-ui/icons';

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
    onUserLogin && onUserLogin(userId);
  }


  function resolveQuery(response) {
    var userId = response.userId;
    if (userId !== "" && userId !== undefined) {
      localStorage.setItem("userId", userId);
      var firstName = response.firstName;
      localStorage.setItem("userName", firstName);
      setClose();
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

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }

      fetch(query,requestOptions)
        .then(function (response) {return response.json();})
        .then((response) => resolveQuery(response));
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
        <Container>
        <div>
          <Image aspectRatio="3/1" src={require("./../images/5.png")} />
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
        </Container>
      </LoginFormContext.Provider>
    </div>
  );
}
const Styles = {
  floPiPic:{
    width: "33%",
    height: "33%", 

  }
}