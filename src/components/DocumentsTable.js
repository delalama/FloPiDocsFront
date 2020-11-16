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
import "./DocumentsTable.css";

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
    "marginTop": "4em",
  };

  const tableHeadStyle = {
    background: "darkseagreen",
  };

  const tableBodyStyle = {
    "backgroundColor": "wheat",
  };

  const upperTitleColumnNameStyle = {
    "textAlign": "center",
    "fontWeight": "bold",
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
  refreshFields: () => {},
  searchingDocuments: Boolean,
});

//TODO Row es document
function Row(props) {
  const [refreshFromParent, setRefreshFromParent] = useState(1);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState(null);
  const { row } = props;
  const { fields, searching, refreshFields } = useDocumentFields(row.id);

  //DEADVID , este useState quiero hacerlo sin mandar números, solo quiero envíar un
  // output como que se tiene que ejecutar sí o sí
  const refreshFieldsFromFieldsCreator = () => {
    console.log("refreshFRomRow");
    setRefreshFromParent(refreshFromParent + 1);
  };

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const { checkedArray, setCheckedArray, addCheckedId } = useCheckArray();

  const rowValuesStyle = {
    "textAlign": "center",
  };


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
              setSelectedDocumentId(row.id);
              refreshFields(row.id);
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={rowValuesStyle} component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell style={rowValuesStyle} maxLength="12">
          {row.purpose}
        </TableCell>
        <TableCell style={rowValuesStyle} maxLength="10">
          {row.content}
        </TableCell>
        <TableCell style={rowValuesStyle}>{row.date}</TableCell>
        <TableCell>
          <FullScreenFieldsCreator
            documentId={row.id}
            refreshFieldsFromFieldsCreator={() => refreshFields(row.id)}
          />
        </TableCell>
      </TableRow>

      {selectedDocumentId && open && (
        <FieldList fields={fields} rowId={row.id} searching={searching} 
        refreshFields={() => refreshFields(row.id)}
        />
        )}
    </React.Fragment>
  )
}


function FieldList({ fields, searching, rowId, refreshFields }) {
  let tableStyle = {
    marginTop: "3em",
  };

  const classes = useRowStyles();

  const fieldStyle = {
    color: "black",
    fontFamily: "monospace",
    fontSize: "1em",
  };

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
            <TableCell colSpan="2" style={fieldStyle}>
              {" "}
              {field.fieldName}
            </TableCell>
            <TableCell colSpan="2" style={fieldStyle}>
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
                <DeleteDialogs
                  rowId={rowId}
                  fieldId={field.id}
                  fieldName={field.fieldName}
                  fieldValueuseContext={field.fieldValue}
                  refreshFields={() => refreshFields(rowId)}
                ></DeleteDialogs>
              </TableCell>
          </TableRow>
        ))}
      </React.Fragment> 
  );
}
