import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useGetOptions from "./../request/useGetOptions";
import changeOptions from "../request/changeOptions";
import useUsers from '../request/useUsers';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function SimpleMenu({logOut}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const {deleteUserAccount} = useUsers();
  const { options, searching, refresh } = useGetOptions();
  const userName= localStorage.getItem("userName");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function safeDeleteClick(options) {
    handleChangeSafeDelete(options);
    refresh();
  }

  function logOutAction() {
    logOut();
  }

  function deleteAccount() {
    deleteUserAccount();
    logOut();
  }

  const handleChangeSafeDelete = (event) => {
    changeOptions(!event);
  };

  const dropDownButtonStyle = {
    color: "white",
  };

  return (
    <div >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={dropDownButtonStyle}
      >
        AJUSTES
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div></div>
        <MenuItem>{userName}</MenuItem>
        <MenuItem> ----------------</MenuItem>

        <MenuItem> Account Options</MenuItem>


        <MenuItem onClick={handleClose}>
          <FormControlLabel
            control={
              <Checkbox
                checked={options}
                onChange={() => safeDeleteClick(options)}
                name="checkedB"
                color="primary"
              />
            }
            label="SafeDelete"
          />
        </MenuItem>
        <MenuItem> ----------------</MenuItem>

        <div></div>
        <MenuItem
          onClick={() => {
            logOutAction();
            // handleClose();
          }}
        >
          <ExitToAppIcon></ExitToAppIcon>
          Log Out
        </MenuItem>

        {/* ------------------------------ */}
        <div></div>
        <MenuItem
          onClick={() => {
            handleClose();
            deleteAccount(options);
          }}
        >
          <DeleteForeverIcon></DeleteForeverIcon>
          Delete Account
        </MenuItem>
        <MenuItem> ----------------</MenuItem>
      </Menu>
    </div>
  );
}
