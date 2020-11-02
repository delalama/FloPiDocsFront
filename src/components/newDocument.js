import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import StringsFloPi from "./StringsFloPi";
import TextField from "@material-ui/core/TextField";
import SaveDocuments from "../request/useSaveDocuments";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({refreshTable}) {
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const title = document.getElementById('newDocTitle').value;
    const purpose = document.getElementById('newDocPurpose').value;
    const content = document.getElementById('newDocContent').value;

    SaveDocuments(title,purpose,content);
    refreshTable && refreshTable(true);
    setOpen(false);
  };

  const dateFormStyle = {
    'justify-content' : 'center',
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {StringsFloPi.newDocument}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {StringsFloPi.newDocument}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <form className={classes.root} noValidate autoComplete="off">
            <ListItem style={dateFormStyle}>
            <TextField id="newDocTitle" label={StringsFloPi.title} />
          </ListItem>

            <ListItem style={dateFormStyle}>
            <TextField id="newDocPurpose" label={StringsFloPi.purpose} />
          </ListItem>

            <ListItem  style={dateFormStyle}>
            <TextField id="newDocContent" label={StringsFloPi.description} />
          </ListItem>
            
          </form>
        </List>
      </Dialog>
    </div>
  );
}
