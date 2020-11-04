import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import deleteField from './../request/deleteField';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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


const deleteButtonStyle = {
    color: 'white',
    background: 'red',
  };


export default function DeleteDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [safeDeleteOption, setSafeDeleteOption] = useState();

  const fieldId=props.fieldId;

  const handleClickOpen = () => {
    var safeDeleteActive = null;
    localStorage.getItem('safeDelete') == 'true' ? safeDeleteActive=true: safeDeleteActive=false;
    setSafeDeleteOption(safeDeleteActive);
    
    if(safeDeleteActive){
      setOpen(true);
    }else{deleteField(fieldId);}
  };
  const handleClose = () => {
      console.log('vamos a borrar el field con id ' + fieldId);
      deleteField(fieldId);
    setOpen(false);
  };


  return (
    <div>
      <Button style={deleteButtonStyle} variant="outlined" onClick={handleClickOpen}>
        DELETE
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          You cannot UNDO a delete action, do you really want to delete?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
              For a faster usability you can change SAFEDELETE on your FloPiDocs profile
          </Typography>
          <Typography gutterBottom>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}