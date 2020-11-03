import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useDocuments from "../request/useDocuments";
import useDocumentFields from "../request/useDocumentFields";
import TablePaginationDemo from "./TablePagination";
import Button from "@material-ui/core/Button";
import DeleteDialogs from "./deleteDialog";
import EditDialogs from "./editDialog";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(id, title, purpose, content, date, protein, price) {
  return {
    id,
    title,
    purpose,
    content,
    date,
  };
}

function getFieldsById(id) {
  console.log("getFields!!" + id);
}

function createField(id, fieldName, fieldValue) {
  return {
    id,
    fieldName,
    fieldValue,
  };
}

//TODO Row es document
//TODO Crear función field, exporta la subtabla field
//TODO Separar las entidades
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState(null);
  const classes = useRowStyles();
  var documentId = "";

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            id="fieldsContainer"
          ></Collapse>
        </TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            id={row.id}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setSelectedDocumentId(row.id);
            }}
            // onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell maxLength="12">{row.purpose}</TableCell>
        <TableCell maxLength="10">{row.content}</TableCell>
        <TableCell>{row.date}</TableCell>
      </TableRow>
      {selectedDocumentId && open && <Field documentId={selectedDocumentId} />}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    field: PropTypes.arrayOf(
      PropTypes.shape({
        fieldName: PropTypes.number,
        fieldValue: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default function CollapsibleTable({ documents, searching }) {
  const { refreshTableState, setRefresh } = useState(false);
  useEffect(() => {
    console.log(`You clicked ${refreshTableState} times`);
  });

  let tableStyle = {
    marginTop: "3em",
  };

  return (
    <TableContainer style={tableStyle} component={Paper} id="documentsTable">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title </TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        {!refreshTableState && (
          <TableBody>
            {searching && "searching..."}
            {documents
              ?.map(({ id, title, purpose, content, date }) =>
                createData(id, title, purpose, content, date)
              )
              .map((row, index) => (
                <Row key={row.id} row={row} />
              ))}
          </TableBody>
        )}
      </Table>
      <TablePaginationDemo></TablePaginationDemo>
    </TableContainer>
  );
}

function Field({ documentId }) {
  const { fields, searching } = useDocumentFields(documentId);

  let tableStyle = {
    marginTop: "3em",
  };
  const classes = useRowStyles();

  const fieldStyle = {
    color: "green",
  };


  function showDeleteDialog() {}

  console.log(documentId);
  return (
    <React.Fragment>
      {/* {searching && "searching..."} */}
      {fields
        ?.map(({ id, fieldName, fieldValue }) =>
          createField(id, fieldName, fieldValue)
        )
        .map((field, index) => (
          <TableRow key={field.id} className={classes.root}>
            <TableCell> </TableCell>
            <TableCell style={fieldStyle}> {field.fieldName}</TableCell>
            <TableCell style={fieldStyle}> {field.fieldValue}</TableCell>
            <TableCell>
              {" "}
              {/* <Button variant="contained" color="primary" fieldId={field.id}>
                EDIT
              </Button>
            </TableCell>
            <TableCell>
              {" "}
              <Button variant="contained" color="secondary" fieldId={field.id}>
                DELETE
              </Button> */}
              <EditDialogs fieldId={field.id} fieldName={field.fieldName} fieldValue={field.fieldValue}></EditDialogs>
            </TableCell>
            <TableCell>
              <DeleteDialogs fieldId={field.id} fieldName={field.fieldName} fieldValue={field.fieldValue}></DeleteDialogs>
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  );
}
