import React, { useContext, useState, createContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FullScreenDialog from "./newDocument";
import SimpleMenu from "./DropDownMenu";
import { SearchContext } from "./../App";
import Dictionary from "./StringsFloPi";
import { AppBarStyles } from "./AppBarStyles.js";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = AppBarStyles;

export default function SearchAppBar({ refreshTable }) {
  const classes = useStyles();
  const [searchByTitle, setSearchByTitle] = useState(true);
  const [searchByPurpose, setSearchByPurpose] = useState(false);
  const [searchByTag, setSearchByTag] = useState(false);
  const [searchBy, setSearchBy] = useState("TITLE");
  const [onSearch, setOnSearch] = useState(false);
  const { search } = useContext(SearchContext);

  function onRefreshTable() {
    refreshTable && refreshTable();
  }

  useEffect(() => {
    setTimeout(() => {
      search(searchBy);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBy]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className="loggedOptions">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* // DEADVID findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition */}
            <SimpleMenu></SimpleMenu>
          </IconButton>
          <div>
            <FullScreenDialog refreshTable={onRefreshTable}></FullScreenDialog>
          </div>

          <Typography id="appName" className={classes.title} noWrap>
            {Dictionary.appName}
          </Typography>
          <h6 id="userName">{localStorage.getItem("userName")}</h6>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="searchBar"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={() => search(searchBy)}
            />
          </div>
          <Checkbox
            checked={searchByTitle}
            onClick= {() => clickOnSearchByTitle()}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <h6>by Title</h6>
          <Checkbox
            checked={searchByPurpose}
            onClick={() => clickOnSearchByPurpose()}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <h6>by Purpose</h6>
          <Checkbox
            checked={searchByTag}
            onClick={() => clickOnSearchByTag()}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <h6>by Tag</h6>
        </Toolbar>
      </AppBar>
    </div>
  );

  function clickOnSearchByTitle() {
    setSearchByTitle(!searchByTitle);
    setSearchByPurpose(false);
    setSearchByTag(false);
    setSearchBy("TITLE");
  }
  function clickOnSearchByPurpose() {
    setSearchByPurpose(!searchByPurpose);
    setSearchByTitle(false);
    setSearchByTag(false);
    setSearchBy("PURPOSE");
  }
  function clickOnSearchByTag() {
    setSearchByTag(!searchByTag);
    setSearchByTitle(false);
    setSearchByPurpose(false);
    setSearchBy("TAG");
  }
}
