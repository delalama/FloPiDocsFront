import React, { useState, useEffect, useContext, createContext } from "react";
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
import useDocumentFields from "../request/useDocumentFields";
import TablePaginationDemo from "./TablePagination";
import DeleteFieldDialogs from "./DeleteFieldDialogs";
import EditDialogs from "./EditFieldDialog";
import TableCheckboxLabels from "./tableCheckbox";
import { DocumentsContext } from "./../App";
import CircularIndeterminate from "./CircularIndeterminate";
import AddTooltip from "./ToolTip";
import FullScreenFieldsCreator from "./FullScreenFieldsCreator";
import "./DocumentsTable.css";
import { Button } from "@material-ui/core";
import DeleteDocumentDialogs from "./DeleteDocumentDialogs";
import EditDocumentDialogs from "./EditDocumentDialog";
import FullScreenEditDocument from "./editDocument";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(id, title, purpose, content, date) {
  return {
    id,
    title,
    purpose,
    content,
    date,
  };
}

function createField(id, fieldName, fieldValue) {
  return {
    id,
    fieldName,
    fieldValue,
  };
}

// TODO SELECCIÓN DE DOCUMENTOS PARA MOSTRAR OPCIONES DE EXPORTACIÓN
const checkedDocumentsArray = [];

Document.propTypes = {
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

export default function CollapsibleTable({ searching }) {
  // DEADVID, estos documentos no refrescan desde useDocuments - refresh ?
  // al crear el context se crean instancias nuevas de las funciones que se declaran?
  const { documents, refresh, searchingDocuments, deleteDocument } = useContext(
    DocumentsContext
  );

  const { refreshTableState, setRefresh } = useState(false);

  useEffect(() => {
    refresh();
  }, [refreshTableState]);

  return (
    <div>
      {searchingDocuments && <CircularIndeterminate></CircularIndeterminate>}
      <TableContainer
        style={Styles.tableStyle}
        component={Paper}
        id="documentsTable"
      >
        <Table aria-label="collapsible table">
          <TableHead style={Styles.tableHeadStyle}>
            <TableRow>
              <TableCell id="selectColumn"></TableCell>
              <TableCell></TableCell>
              <TableCell style={Styles.upperTitleColumnNameStyle}>
                Title{" "}
              </TableCell>
              <TableCell style={Styles.upperTitleColumnNameStyle}>
                Purpose
              </TableCell>
              <TableCell style={Styles.upperTitleColumnNameStyle}>
                Content
              </TableCell>
              <TableCell style={Styles.upperTitleColumnNameStyle}>
                Date
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {!refreshTableState && (
            <TableBody style={Styles.tableBodyStyle}>
              {documents
                ?.map(({ id, title, purpose, content, date }) =>
                  createData(id, title, purpose, content, date)
                )
                .map((row, index) => (
                  <Document key={row.id} row={row} />
                ))}
            </TableBody>
          )}
        </Table>
        <TablePaginationDemo></TablePaginationDemo>
      </TableContainer>
    </div>
  );
}
var checkedRowArr = [];

function Document(props) {
  const [selectedDocumentId, setSelectedDocumentId] = React.useState(null);
  const { row: documentProps } = props;
  const { fields, searching, refreshFields } = useDocumentFields(
    documentProps.id
  );
  const [isChecked, setIsChecked] = useState(false);

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  function pushCheck(data) {
    setIsChecked(!isChecked);
    let id = data.row.id;
    var index = checkedRowArr.findIndex((v) => v === id);

    index === -1 ? checkedRowArr.push(id) : checkedRowArr.splice(index, 1);
  }

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
          <TableCheckboxLabels
            id={documentProps.id}
            addCheckId={() => pushCheck(props)}
          >
            {" "}
          </TableCheckboxLabels>
        </TableCell>
        <TableCell>
          <IconButton
            iconid={documentProps.id}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setSelectedDocumentId(documentProps.id);
              refreshFields(documentProps.id);
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={Styles.rowValuesStyle} maxLength="12">
          {documentProps.title}
        </TableCell>
        <TableCell style={Styles.rowValuesStyle} maxLength="12">
          {documentProps.purpose}
        </TableCell>
        <TableCell style={Styles.rowValuesStyle} maxLength="10">
          {documentProps.content}
        </TableCell>
        <TableCell style={Styles.rowValuesStyle}>
          {documentProps.date}
        </TableCell>
        <TableCell>
          <FullScreenFieldsCreator
            documentId={documentProps.id}
            refreshFieldsFromFieldsCreator={() =>
              refreshFields(documentProps.id)
            }
          />
        </TableCell>
        {isChecked && (
          <TableCell>
            <FullScreenEditDocument row={documentProps}></FullScreenEditDocument>
            {/* <EditDocumentDialogs row={documentProps}></EditDocumentDialogs> */}
            <DeleteDocumentDialogs
              documentId={documentProps.id}
            ></DeleteDocumentDialogs>
          </TableCell>
        )}
      </TableRow>

      {selectedDocumentId && open && (
        <FieldList
          fields={fields}
          rowId={documentProps.id}
          searching={searching}
          refreshFields={() => refreshFields(documentProps.id)}
        />
      )}
    </React.Fragment>
  );
}

function FieldList({ fields, searching, rowId, refreshFields }) {
  let tableStyle = {
    marginTop: "3em",
  };

  const classes = useRowStyles();

  const styles = {
    fieldStyle: {
      color: "black",
      fontFamily: "monospace",
      fontSize: "1em",
      textAlign: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "15vw",
    },
  };

  function mouseOverField(e) {
    e.target.style.whiteSpace = "normal";
  }
  function mouseLeaveField(e) {
    e.target.style.whiteSpace = "nowrap";
  }

  return (
    <React.Fragment>
      {/* {searching && <CircularIndeterminate></CircularIndeterminate>} */}
      {fields
        ?.map(({ id, fieldName, fieldValue }) =>
          createField(id, fieldName, fieldValue)
        )
        .map((field, index) => (
          <TableRow key={field.id} className={classes.root}>
            <TableCell></TableCell>
            <TableCell
              onMouseOver={mouseOverField}
              onMouseLeave={mouseLeaveField}
              colSpan="2"
              style={styles.fieldStyle}
            >
              {" "}
              {field.fieldName}
            </TableCell>
            <TableCell
              onMouseOver={mouseOverField}
              onMouseLeave={mouseLeaveField}
              colSpan="2"
              style={styles.fieldStyle}
            >
              {" "}
              {field.fieldValue}
            </TableCell>

            <TableCell>
              <EditDialogs
                fieldId={field.id}
                fieldName={field.fieldName}
                fieldValue={field.fieldValue}
              ></EditDialogs>
            </TableCell>
            <TableCell>
              <DeleteFieldDialogs
                rowId={rowId}
                fieldId={field.id}
                fieldName={field.fieldName}
                fieldValueuseContext={field.fieldValue}
                refreshFields={() => refreshFields(rowId)}
              ></DeleteFieldDialogs>
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  );
}

const Styles = {
  rowValuesStyle: {
    textAlign: "center",
    whiteSpace: "nowrap",
    textOverFlow: "ellipsis",
    overflow: "hidden",
    width: "50px",
  },
  tableStyle: {
    marginTop: "4em",
  },
  tableHeadStyle: {
    background: "darkseagreen",
  },
  tableBodyStyle: {
    backgroundColor: "wheat",
  },
  upperTitleColumnNameStyle: {
    textAlign: "center",
    fontWeight: "bold",
  },
};
