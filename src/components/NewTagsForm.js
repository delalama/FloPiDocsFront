import React from "react";
import { Event } from '@material-ui/icons';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useTags from "./../request/useTags";
import {TagDto} from "./../classes/Tag";

export default function NewTagsForm(props) {

  function handleSubmit(event) {
    event.preventDefault();
    console.log("tag Submit");
  }
  function newTag(){
    const tagText = document.getElementById("tag").value;
    const tagDto = new TagDto(localStorage.getItem("userId"), tagText ,props.documentTags.id, )
    props.createTag(tagDto);
  } 
  return (
    <form onSubmit={handleSubmit} id="newTagForm">
      <TextField id="tag" label="WRITE NEW TAG" />
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => newTag()}
      >
        <AddIcon />
      </Fab>
    </form>

  );
}
