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
import DeleteDialogs from "./deleteDialog";
import EditDialogs from "./editDialog";
import TableCheckboxLabels from "./tableCheckbox";
import useCheckArray from "./useCheckArray";
import { DocumentsContext } from "./../App";
import CircularIndeterminate from "./CircularIndeterminate";
import AddTooltip from "./ToolTip";
import FullScreenFieldsCreator from "./FullScreenFieldsCreator";


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

function pushCheckedDocument(props) {
  const found = checkedDocumentsArray.find(
    (element) => element === props.row.id
  );
  checkedDocumentsArray.push(props.row.id);
  console.log(checkedDocumentsArray);
}

//TODO Row es document
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState(null);
  const classes = useRowStyles();

  const { checkedArray, setCheckedArray, addCheckedId } = useCheckArray();

  const rowValuesStyle = {
    "text-align": "center",
  };
 function onRefreshTable() {

    console.log("refreshing table event" + row.id);
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
            id={row.id}
            addCheckId={() => pushCheckedDocument(props)}
          >
            {" "}
          </TableCheckboxLabels>
        </TableCell>
        <TableCell>
          <IconButton
            iconid={row.id}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setSelectedDocumentId(row.id);
            }}
            /*  TODO
            MozUserSelect: "none"
WebkitUserSelect: "none"
msUserSelect: "none" */
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell 
        style={rowValuesStyle} 
        component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell style={rowValuesStyle} maxLength="12">{row.purpose}</TableCell>
        <TableCell style={rowValuesStyle} maxLength="10">{row.content}</TableCell>
        <TableCell
        style={rowValuesStyle} 
        >
          {row.date}
          </TableCell>
        <TableCell>
        <FullScreenFieldsCreator documentId={row.id} refreshTable={onRefreshTable}></FullScreenFieldsCreator>
        </TableCell>
      </TableRow>
      {/* //DEADVID , cómo añadir aquí un contenedor para los fields?, es para dar formato */}
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

export default function CollapsibleTable({ searching }) {
  const { documents, refresh, searchingDocuments } = useContext(
    DocumentsContext
  );

  const { refreshTableState, setRefresh } = useState(false);

  useEffect(() => {
    refresh();
  }, [refreshTableState]);

  let tableStyle = {
    "margin-top": "4em",
  };

  const tableHeadStyle = {
    background: "darkseagreen",
  };

  const tableBodyStyle = {
    "background-color": "wheat",
  };

  const upperTitleColumnNameStyle = {
    "text-align": "center",
    "font-weight": "bold",
  };

  return (
    <div>
      {searchingDocuments && <CircularIndeterminate></CircularIndeterminate>}
      <TableContainer style={tableStyle} component={Paper} id="documentsTable">
        <Table aria-label="collapsible table">
          <TableHead style={tableHeadStyle}>
            <TableRow>
              <TableCell id="selectColumn"></TableCell>
              <TableCell></TableCell>
              <TableCell style={upperTitleColumnNameStyle}>Title </TableCell>
              <TableCell style={upperTitleColumnNameStyle}>Purpose</TableCell>
              <TableCell style={upperTitleColumnNameStyle}>Content</TableCell>
              <TableCell style={upperTitleColumnNameStyle}>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {!refreshTableState && (
            <TableBody style={tableBodyStyle}>
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
    </div>
  );
}

export const FieldsContext = createContext({
  refresh: () => {},
});

function Field({ documentId }) {
  const { fields, searching, refresh } = useDocumentFields(documentId);

  let tableStyle = {
    marginTop: "3em",
  };

  const classes = useRowStyles();

  const fieldStyle = {
    color: "green",
  };

  return (
    <React.Fragment>
      {searching && <CircularIndeterminate></CircularIndeterminate>}
      {fields
        ?.map(({ id, fieldName, fieldValue }) =>
          createField(id, fieldName, fieldValue)
        )
        .map((field, index) => (
          <TableRow key={field.id} className={classes.root}>
            <TableCell> </TableCell>
            <TableCell colSpan="2" style={fieldStyle}>
              {" "}
              {field.fieldName}
            </TableCell>
            <TableCell colSpan="2" style={fieldStyle}>
              {" "}
              {field.fieldValue}
            </TableCell>

            <FieldsContext.Provider
              value={{
                refresh,
              }}
            >
              <TableCell>
                <EditDialogs
                  fieldId={field.id}
                  fieldName={field.fieldName}
                  fieldValue={field.fieldValue}
                ></EditDialogs>
              </TableCell>
              <TableCell>
                <DeleteDialogs
                  fieldId={field.id}
                  fieldName={field.fieldName}
                  fieldValueuseContext={field.fieldValue}
                ></DeleteDialogs>
              </TableCell>
            </FieldsContext.Provider>
          </TableRow>
        ))}
    </React.Fragment>
  );
}
