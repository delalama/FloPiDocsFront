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
import SaveFields from "../request/useSaveFields";
import CheckIcon from '@material-ui/icons/Check';
import AddTooltip from "./ToolTip";

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

export default function FullScreenFieldsCreator({documentId, refreshTable}) {
 
  const documentid = documentId;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOnSave = () => {
    const fieldName = document.getElementById('newFieldName').value;
    const fieldValue = document.getElementById('newFieldValue').value;

    SaveFields(fieldName,fieldValue, documentid);
    setIconsInitValue();
    refreshTable && refreshTable(true);
    setOpen(false);
  };

  const handleCloseWithoutSave = () => {
    setOpen(false);
    setIconsInitValue();
  };

  const dateFormStyle = {
    'justify-content' : 'center',
  }

  function setIconsInitValue(){
      setTitleIconDisplay(false);
      setPurposeIconDisplay(false);
  }

  const [titleIconDisplay, setTitleIconDisplay] = useState(false);

  function onChangeFieldName(event){
    var value = event.target.value;
    if(value.length > 0) { 
      setTitleIconDisplay(true);
    } else {
      setTitleIconDisplay(false);
    }
  }
 

  const [purposeIconDisplay, setPurposeIconDisplay] = useState(false);

  function onChangeFieldValue(event){
    var value = event.target.value;
    if( value.length > 0 ) {
      setPurposeIconDisplay(true);
    } else setPurposeIconDisplay(false);
  }


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {StringsFloPi.newField}
      </Button>
      
{/*     DEADVID , se puede pasar este ONCLICK a este TOOLTIP??? 
      <AddTooltip onClick={handleClickOpen}> 
      </AddTooltip> 
 */}
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
              {StringsFloPi.newField}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {documentid}
            </Typography>
            <Button id='saveButton' autoFocus color="inherit" onClick={handleCloseOnSave} disabled={!titleIconDisplay || !purposeIconDisplay}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <form className={classes.root} noValidate autoComplete="off">
            <ListItem style={dateFormStyle}>
            <TextField id="newFieldName" label={StringsFloPi.fieldName} onChange={onChangeFieldName}/>
            {titleIconDisplay && <CheckIcon></CheckIcon>}
          </ListItem>

            <ListItem style={dateFormStyle}>
            <TextField id="newFieldValue" label={StringsFloPi.fieldValue} onChange={onChangeFieldValue}/>
            {purposeIconDisplay && <CheckIcon></CheckIcon>}
          </ListItem>

          </form>
        </List>
      </Dialog>
    </div>
  );
}
