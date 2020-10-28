import React, { useState, useCallback, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useFetch, { Provider } from "use-http";

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

export default function LoginForm2({ onUserLogin }) {
  const classes = useStyles();
  const values = {
    email: "",
    password: "",
  };
  
  function setEmail(email) {
    var isBirel = Boolean(email.substring(0, 4).toLowerCase() === "bire");
    const message = document.getElementById("message");
    isBirel ? (message.innerHTML = "Pues cuelga") : (message.innerHTML = "");
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

  function resolveQuery(response) {
    console.log(response);
    if (!response.userId == "") {
      var userId = response.userId;

      onUserLogin && onUserLogin(userId);

      localStorage.setItem("userId", userId);
      var firstName = response.firstName;
      document.getElementById("userName").innerHTML = firstName;
      var login = document.getElementById("loginDiv");
      login.parentNode.removeChild(login);

      // visualizar elementos once looged
      var arrayOfElements = document.getElementsByClassName("loggedOptions");
      var lengthOfArray = arrayOfElements.length;
      for (var i = 0; i < lengthOfArray; i++) {
        arrayOfElements[i].style.display = "flex";
      }
    } else {
      document.getElementById("loginForm").reset();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.email != 0 && values.password != 0) {
      const server = "http://localhost:8080";
      const endoint = "/user/login";
      const params = "?email=" + values.email + "&password=" + values.password;

      const query = server + endoint + params;

      fetch(query, {
        method: "GET",
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

  const HandleSubmitUseFetch = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);
    const { get, post, response, loading, error } = useFetch({ data: [] });

    const values = {
      email: "elaltas@gmail.com",
      password: "pass",
    };
    const server = "http://localhost:8080";
    const endoint = "/user/login";
    const params = "?email=" + values.email + "&password=" + values.password;

    const loadUser = useCallback(async () => {
      if (!userId) return;

      const initialUser = await get(params);
      if (response.ok) {
        setUser(loadUser);
        console.log(response);
      }
    }, [get, response]);

    useEffect(() => {
      loadUser();
    }, [loadUser]);
  };

  function printHola() {
    console.log("hola");
    // alert("submitting");
  }

  return (
    <div id="loginDiv">
      <div>
        <h1 style={{ color: "red", fontSize: "4em" }}>FloπDox</h1>
      </div>

      <div style={messageStyle}>
        <h1 id="message"></h1>
      </div>
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
      </form>
    </div>
  );
}
