import React, { useContext, useState, createContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FullScreenDialog from "./newDocument";
import SimpleMenu from "./DropDownMenu";
import { SearchContext } from "./../App";
import { AppBarStyles } from "./AppBarStyles.js";
import Checkbox from "@material-ui/core/Checkbox";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const useStyles = AppBarStyles;

export default function SearchAppBar({ refreshTable, logOut }) {
  const classes = useStyles();
  const [searchByTitle, setSearchByTitle] = useState(true);
  const [searchByPurpose, setSearchByPurpose] = useState(false);
  const [searchByTag, setSearchByTag] = useState(false);
  const [searchBy, setSearchBy] = useState("TITLE");
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
      <Container fluid>
        <Row>
          <AppBar position="fixed">
            <Toolbar className="loggedOptions">
              <Col sm={2} xs={1} style={Styles.contents}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                ></IconButton>
                <SimpleMenu logOut={() => logOut()}></SimpleMenu>
              </Col>
              <div className={classes.search}>
                <Col md={2} sm={1} xs={1}>
                  <SearchIcon />
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
                </Col>
              </div>
              <Col md={2} sm={1} xs={1} style={Styles.contents}>
                <Checkbox
                  checked={searchByTitle}
                  onClick={() => clickOnSearchByTitle()}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <h6>by Title</h6>
              </Col>
              <Col md={2} sm={1} xs={1} style={Styles.contents}>
                <Checkbox
                  checked={searchByPurpose}
                  onClick={() => clickOnSearchByPurpose()}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <h6>by Purpose</h6>
              </Col>
              <Col md={2} sm={1} xs={1}  style={Styles.contents}>
                <Checkbox
                  checked={searchByTag}
                  onClick={() => clickOnSearchByTag()}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <h6>by Tag</h6>
              </Col>
              <Col md={4} sm={3} xs={3} >
                <FullScreenDialog
                  refreshTable={onRefreshTable}
                ></FullScreenDialog>
              </Col>
            </Toolbar>
          </AppBar>
        </Row>
      </Container>
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

const Styles = {
  rightAppBar: {
    allignItems: "right",
    position: "absolute",
    right: "40px",
    display: "flex",
  },
  rightAlign: {
    position: "absolute",
    right: "0px",
    width: "13vw",
    marginRight: "2vw",
  },
  contents: {
    display: "contents",
  },
};
