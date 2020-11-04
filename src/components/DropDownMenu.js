import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useGetOptions from "./../request/useGetOptions";
import changeOptions from "../request/changeOptions";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { options, searching, refresh } = useGetOptions();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  function safeDeleteClick (options) {
    handleChangeSafeDelete(options);
    refresh();
  }

  const handleChangeSafeDelete = (event) => {
    changeOptions(!event);
  };

  const dropDownButtonStyle = {
    color:'white',
  }

  return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={dropDownButtonStyle}
        >AJUSTES</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div></div>
        <MenuItem> Account Options</MenuItem>
        <MenuItem onClick={handleClose}>
        <FormControlLabel
            control={
              <Checkbox
                // checked={state.safeDelete}
                checked={options}
                // DEADVID, pk funciona distinto si le paso una función anónima? 
                // de este modo no se ejecuta 1000 veces
                // onChange={ () => handleChangeSafeDelete(options)}
                onChange={ () => safeDeleteClick(options)}
                name='checkedB'
                color="primary"
              />
            }
            label="SafeDelete"
          />
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>notImplemented</MenuItem> */}
      </Menu>
    </div>
  );
}
