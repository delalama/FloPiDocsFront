import React , {useState} from "react";
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
import CheckIcon from '@material-ui/icons/Check';

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

  const handleCloseOnSave = () => {
    const title = document.getElementById('newDocTitle').value;
    const purpose = document.getElementById('newDocPurpose').value;
    const content = document.getElementById('newDocContent').value;

    SaveDocuments(title,purpose,content);
    refreshTable && refreshTable(true);
    setOpen(false);
  };

  const handleCloseWithoutSave = () => {
    setOpen(false);
  };

  const dateFormStyle = {
    'justify-content' : 'center',
  }

  const [titleIconDisplay, setTitleIconDisplay] = useState(false);

  function onChangeTitle(event){
    var value = event.target.value;
    if(value.length > 0) { 
      setTitleIconDisplay(true);
    } else {
      setTitleIconDisplay(false);
    }
  }

  const [purposeIconDisplay, setPurposeIconDisplay] = useState(false);

  function onChangePurpose(event){
    var value = event.target.value;
    if( value.length > 0 ) {
      setPurposeIconDisplay(true);
    } else setPurposeIconDisplay(false);
  }


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {StringsFloPi.newDocument}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseWithoutSave}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseWithoutSave}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {StringsFloPi.newDocument}
            </Typography>
            <Button id='saveButton' autoFocus color="inherit" onClick={handleCloseOnSave} disabled={!titleIconDisplay || !purposeIconDisplay}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <form className={classes.root} noValidate autoComplete="off">
            <ListItem style={dateFormStyle}>
            <TextField id="newDocTitle" label={StringsFloPi.title} onChange={onChangeTitle}/>
            {titleIconDisplay && <CheckIcon></CheckIcon>}
          </ListItem>

            <ListItem style={dateFormStyle}>
            <TextField id="newDocPurpose" label={StringsFloPi.purpose} onChange={onChangePurpose}/>
            {purposeIconDisplay && <CheckIcon></CheckIcon>}
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
