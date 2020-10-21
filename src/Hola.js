import React, { Component } from "react";

const Hola = ({ nombre }) => (
  <h1>{nombre === "César" ? `Ave ${nombre}` : "Tú no eres César"}</h1>
);

export default Hola;
