import React , {useState, useEffect} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


export default function TableCheckboxLabels( props ) {
  let [state, setState] = useState(false);

  const handleChange = (event) => {
    setState(!state);
  };
  
  const documentId = props.id;

  function onCheck (){
    setState(true);
    props.addCheckId(documentId);
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox 
            checked={state}
            onChange={handleChange}
            onClick={ () => onCheck()}
             />}
      />
    </FormGroup>
  );
}
