import React, { useState, useRef } from "react";
import { Event } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useTags from "./../request/useTags";
import { TagDto } from "./../classes/Tag";

export default function NewTagsForm(props) {
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState(false);

  const isEmpty = (text) => {
    return text === "" || /\s/.test(text);
  };

  function handleSubmitButton() {
    const tagText = document.getElementById("tag").value;
    // const tagText = document.getElementById("tag").value;
    
    if (isEmpty(tagText)) {
      setSubmitButtonDisplay(false);
    } else {
      setSubmitButtonDisplay(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function createTag(event) {
    const tagText = document.getElementById("tag").value;
    newTag(tagText);
    document.getElementById("tag").value = "";
    setSubmitButtonDisplay(false);
  }

  function newTag(tagText) {
    const tagDto = new TagDto(
      localStorage.getItem("userId"),
      tagText,
      props.documentTags.id
    );
    props.createTag(tagDto);
  }
  return (
    <form onSubmit={handleSubmit} id="newTagForm">
      <TextField
        id="tag"
        label="WRITE NEW TAG"
        onChange={() => handleSubmitButton()}
      />
      {submitButtonDisplay && (
        <Fab color="primary" aria-label="add" onClick={() => createTag()}>
          <AddIcon />
        </Fab>
      )}
    </form>
  );
}
