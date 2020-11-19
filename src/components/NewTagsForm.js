import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function NewTagsForm() {


    function handleSubmit() {
        console.log("tag Submit");
        
    }

  return (
    <form id="newTagForm" onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="WRITE NEW TAG" />
    </form>
  );
}
