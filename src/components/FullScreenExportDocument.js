import React, { useState, useContext } from "react";
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
import TagsArray from "./TagsArray";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NewTagsForm from "./NewTagsForm";
import { DocumentDto } from "../classes/document";
import { DocumentsContext } from "../App";
import useTags from "../request/useTags";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenExportDocument(props) {
  const row = props.row;
  const { updateDocument } = useContext(DocumentsContext);
  // const { tags, deleteTagById, searching, fetch, createTag } = useTags(
  //   props.row.id
  // );

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOnSave = () => {
    const title =
      document.getElementById("editDocTitle").value === ""
        ? row.title
        : document.getElementById("editDocTitle").value;
    const purpose =
      document.getElementById("editDocPurpose").value === ""
        ? row.purpose
        : document.getElementById("editDocPurpose").value;
    const content =
      document.getElementById("editDocContent").value === ""
        ? row.content
        : document.getElementById("editDocContent").value;

    const documentDto = new DocumentDto(
      row.id,
      localStorage.getItem("userId"),
      title,
      purpose,
      content,
      row.date
    );

    // SaveDocuments(title, purpose, content);
    updateDocument(documentDto);
    setIconsInitValue();
    setOpen(false);
  };

  const handleCloseWithoutSave = () => {
    setOpen(false);
    setIconsInitValue();
  };

  function setIconsInitValue() {
    setTitleIconDisplay(false);
    setPurposeIconDisplay(false);
  }

  const [titleIconDisplay, setTitleIconDisplay] = useState(false);

  function onChangeTitle(event) {
    var value = event.target.value;
    if (value.length > 0) {
      setTitleIconDisplay(true);
    } else {
      setTitleIconDisplay(false);
    }
  }

  const [purposeIconDisplay, setPurposeIconDisplay] = useState(false);

  function onChangePurpose(event) {
    var value = event.target.value;
    if (value.length > 0) {
      setPurposeIconDisplay(true);
    } else setPurposeIconDisplay(false);
  }

  const [contentIconDisplay, setContentIconDisplay] = useState(false);

  function onChangeContent(event) {
    var value = event.target.value;
    if (value.length > 0) {
      setContentIconDisplay(true);
    } else setContentIconDisplay(false);
  }

  function openAddTag() {
    setOpenNewTag(!openNewTag);
  }

  return (
    <div>
      {console.log(props.fields)}
      <Button variant="contained" onClick={handleClickOpen}>
        EXPORT
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
              {StringsFloPi.editDocument}
            </Typography>
            <Button
              id="saveButton"
              autoFocus
              color="inherit"
              onClick={handleCloseOnSave}
              disabled={
                !titleIconDisplay && !purposeIconDisplay && !contentIconDisplay
              }
            >
              EDIT DOCUMENT
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <form className={classes.root} noValidate autoComplete="off">
            <ListItem style={Styles.dateFormStyle}>
              
            </ListItem>
          </form>

            <ListItem style={Styles.dateFormStyle}>
              <Typography variant="h5">TAGS</Typography>
            </ListItem>
              <ListItem style={Styles.dateFormStyle}>
                {!openNewTag && (
                  <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => openAddTag()}
                  >
                    <AddIcon />
                  </Fab>
                )}

              </ListItem>
            
        </List>
      </Dialog>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Styles = {
  dateFormStyle: {
    justifyContent: "center",
  },
};
