import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import StringsFloPi from "./StringsFloPi";
import TextField from "@material-ui/core/TextField";
import useSaveFields from "../request/useSaveFields";
import CheckIcon from "@material-ui/icons/Check";
import ImageUploaderComponent from "./ImageUploader";

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

export default function FullScreenFieldsCreator({
  documentId,
  refreshFieldsFromFieldsCreator,
}) {
  const { save, savePicture } = useSaveFields();
  const documentid = documentId;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fieldValueDisplay, setFieldValueDisplay] = useState(true);
  const [pictureRaw, setPictureRaw] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOnSave = () => {
    if (fieldValueDisplay) {
      saveSimpleField();
    } else {
      savePictureField();
    }
  };

  function savePictureField() {
    const fieldName = document.getElementById("newFieldName").value;
    const picture = pictureRaw;

    savePicture(fieldName, picture, documentid);
    afterSave();
  }

  
  function saveSimpleField() {
    const fieldName = document.getElementById("newFieldName").value;
    const fieldValue = document.getElementById("newFieldValue").value;

    save(fieldName, fieldValue, documentid);
    afterSave();
  }

  function afterSave() {
    setIconsInitValue();
    setTimeout(() => {
      refreshFieldsFromFieldsCreator && refreshFieldsFromFieldsCreator();
    }, 10);
    setFieldValueDisplay(true);
    // refreshTable && refreshTable(true);
    setOpen(false);
  }

  const handleCloseWithoutSave = () => {
    setOpen(false);
    setIconsInitValue();
    setFieldValueDisplay(true);
  };

  const dateFormStyle = {
    justifyContent: "center",
  };

  function setIconsInitValue() {
    setNameIconDisplay(false);
    setValueIconDisplay(false);
  }

  const [nameIconDisplay, setNameIconDisplay] = useState(false);

  function onChangeFieldName(event) {
    var value = event.target.value;
    if (value.length > 0) {
      setNameIconDisplay(true);
    } else {
      setNameIconDisplay(false);
    }
  }

  const [valueIconDisplay, setValueIconDisplay] = useState(false);

  function onChangeFieldValue(event) {
    var value = event.target.value;
    if (value.length > 0) {
      setValueIconDisplay(true);
    } else setValueIconDisplay(false);
  }

  function onUploadImage() {
    setFieldValueDisplay(false);
    setValueIconDisplay(true);
    setPictureRaw(
      document.getElementsByClassName("uploadPictureContainer")[0].children[1]
        .src
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {StringsFloPi.newField}
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
              {StringsFloPi.newField}
            </Typography>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button
              id="saveButton"
              autoFocus
              color="inherit"
              onClick={handleCloseOnSave}
              disabled={!nameIconDisplay || !valueIconDisplay}
            >
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <form className={classes.root} noValidate autoComplete="off">
            <ListItem style={dateFormStyle}>
              <TextField
                id="newFieldName"
                label={StringsFloPi.fieldName}
                onChange={onChangeFieldName}
              />
              {nameIconDisplay && <CheckIcon></CheckIcon>}
            </ListItem>

            {fieldValueDisplay && (
              <ListItem style={dateFormStyle}>
                <TextField
                  id="newFieldValue"
                  label={StringsFloPi.fieldValue}
                  onChange={onChangeFieldValue}
                />
                {valueIconDisplay && <CheckIcon></CheckIcon>}
              </ListItem>
            )}
            <ListItem style={dateFormStyle}>
              <ImageUploaderComponent
                onUploadImage={() => onUploadImage()}
              ></ImageUploaderComponent>
            </ListItem>
          </form>
        </List>
      </Dialog>
    </div>
  );
}
