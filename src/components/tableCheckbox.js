import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


export default function TableCheckboxLabels(props) {
  const [state, setState] = React.useState({
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const documentId = props.id;

  function onCheck (){
    props.addCheckId(documentId);
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox 
            checked={state.checkedC}
            name="checkedC"
            onChange={handleChange}
            onClick={ () => onCheck()}
             />}
      />
    </FormGroup>
  );
}
