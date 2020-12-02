import React, { useState } from "react";
import { FieldDto } from "../classes/Field";
import { StylesProvider, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import UpdateFields from "./../request/useSaveFields";
import useSaveFields from '../request/useSaveFields';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialogs(props) {
  const {fieldId, fieldName: preFieldName, fieldValue:preFieldValue, fieldPicture: preFieldPicture}= props;
 
  const [open, setOpen] = useState(false);
  const {UpdateFields} = useSaveFields();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseOnEdit = () => {
    let fieldName = document.getElementById("fieldName").value;
    let fieldValue = document.getElementById("fieldValue").value;

    let fieldNameEmpty = fieldName === "";
    let fieldValueEmpty = fieldValue === "";

    fieldNameEmpty ? (fieldName = preFieldName) : (fieldName = fieldName);
    fieldValueEmpty ? (fieldValue = preFieldValue) : (fieldValue = fieldValue);

    const fieldDTO = new FieldDto(fieldId, fieldName, fieldValue);
    console.log(fieldDTO);

    UpdateFields(fieldDTO);
    setTimeout( () =>{ props.refreshFields && props.refreshFields(); }, 100);
    setOpen(false);
  };

  const editButtonStyle = {
    color: "white",
    background: "#3f51b5",
  };

  return (
    <div>
      <Button
        style={editButtonStyle}
        variant="outlined"
        onClick={handleClickOpen}
      >
        EDIT
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      setOpen(false);
    };
  
    const fieldId = props.fieldId;
    const preFieldName = props.fieldName;
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit screen
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <TextField id="fieldName" label={preFieldName} />
            <TextField id="fieldValue" label={preFieldValue} />
            <img src={preFieldPicture} style={Styles.Picture}/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleCloseOnEdit()} color="secondary">
            EDIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

const Styles = {
  Picture: {
    width: "20vw"
  }
}
