import { createStyles,fade,Theme, makeStyles } from "@material-ui/core/styles";

export  const newUserFormStyles = makeStyles((theme: Theme) =>
  createStyles({
  dataForm: {
    justifyContent: "center",
  },
  sendButton: {
    background: "#3f51b5",
    color: "White",
    margin: "2em",
  },
  resetButton: {
    background: "#3f51b5",
    color: "White",
    margin: "2em",
  },
  toogleButton: {
    background: "#3f51b5",
    color: "White",
    marginRight: "1em",
  },
  check: {
    fill: "limegreen",
    display: "none",
  },
})
);