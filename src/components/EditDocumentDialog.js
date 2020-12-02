import React , {useContext }from "react";
import useDocuments from "../request/useDocuments";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { DocumentDto } from "./../classes/document";
import Divider from "@material-ui/core/Divider";
import { DocumentsContext } from "../App";
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

export default function EditDocumentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { updateDocument } = useContext(DocumentsContext);
  // useRef

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const docValues = {
      userId: localStorage.getItem("userId"),
      id: documentId,
      titlePost:
        document.getElementById("titleName").value === ""
          ? title
          : document.getElementById("titleName").value,
      purposePost:
        document.getElementById("purposeValue").value === ""
          ? purpose
          : document.getElementById("purposeValue").value,
      contentPost:
        document.getElementById("contentValue").value === ""
          ? content
          : document.getElementById("contentValue").value,
      datePost: date,
    };
    const documentValuesChanged =
      docValues.titlePost !== title ||
      docValues.purposePost !== purpose ||
      docValues.contentPost !== content;

    if (documentValuesChanged) {
      updateDocument(
        new DocumentDto(
          docValues.id,
          docValues.userId,
          docValues.titlePost,
          docValues.purposePost,
          docValues.contentPost,
          docValues.datePost
        )
      );
    }
    setOpen(false);
  };

  const title = props.row.title;
  const purpose = props.row.purpose;
  const content = props.row.content;
  const date = props.row.date;
  const documentId = props.row.id;

  return (
    <div>
      <Button
        style={Styles.editButtonStyle}
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
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit screen
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <div>
              <TextField id="titleName" label={title} />
            </div>
            <div>
              <TextField id="purposeValue" label={purpose} />
            </div>
            <div>
              <TextField id="contentValue" label={content} />
            </div>
            <Divider></Divider>
            <div>
              <TextField id="contentValue" label="tags" />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            EDIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Styles = {
  editButtonStyle: {
    color: "white",
    background: "#3f51b5",
  },
  arrowStyle: {
    fill: "blue",
  },
};
