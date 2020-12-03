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
import DeleteFieldDialogs from "./DeleteFieldDialogs";
import EditDialogs from "./EditFieldDialog";
import TableCheckboxLabels from "./tableCheckbox";
import { DocumentsContext } from "./../App";
import CircularIndeterminate from "./CircularIndeterminate";
import FullScreenFieldsCreator from "./FullScreenFieldsCreator";
import "./DocumentsTable.css";
import DeleteDocumentDialogs from "./DeleteDocumentDialogs";
import FullScreenEditDocument from "./FullScreenEditDocument";
import { useMediaQuery } from "react-responsive";
import Zoom from "react-medium-image-zoom";
import ExportButton from "./ExportButton";
import "react-medium-image-zoom/dist/styles.css";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(id, title, purpose, date) {
  return {
    id,
    title,
    purpose,
    date,
  };
}

function createField(id, fieldName, fieldValue, fieldPicture) {
  return {
    id,
    fieldName,
    fieldValue,
    fieldPicture,
  };
}

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

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const MobileVertical = ({ children }) => {
  const MobileVertical = useMediaQuery({ maxWidth: 550 });
  return MobileVertical ? children : null;
};

export default function MainTable({ searching }) {
  const { documents, refresh, searchingDocuments, deleteDocument } = useContext(
    DocumentsContext
  );
  const { refreshTableState, setRefresh } = useState(false);

  const isMobileVertical = useMediaQuery({ maxWidth: 550 });

  useEffect(() => {
    refresh();
  }, [refreshTableState]);

  const emptyDocuments = documents.length === 0;

  return (
    <div>
      {emptyDocuments && <h6 style={Styles.message}>NO DOCUMENT</h6>}

      {isMobileVertical && (
        <h6 style={Styles.message}>PLEASE TURN YOUR DEVICE HORIZONTAL</h6>
      )}
      {/* TODO , NO FUNCIONA EL SPINNER */}
      {searchingDocuments && <CircularIndeterminate></CircularIndeterminate>}
      {!emptyDocuments && !isMobileVertical && (
        <TableContainer
          style={Styles.tableStyle}
          component={Paper}
          id="documentsTable"
        >
          <Table aria-label="collapsible table" style={Styles.tableBodyStyle}>
            <TableHead style={Styles.tableHeadStyle}>
              <TableRow>
                <TableCell id="selectColumn"></TableCell>
                <TableCell></TableCell>
                <TableCell style={Styles.upperTitleColumnNameStyle}>
                  Title
                </TableCell>
                <TableCell style={Styles.upperTitleColumnNameStyle}>
                  Purpose
                </TableCell>
                <Desktop>
                  <TableCell style={Styles.upperTitleColumnNameStyle}>
                    Date
                  </TableCell>
                </Desktop>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {!refreshTableState && (
              <TableBody >
                {documents
                  ?.map(({ id, title, purpose, date }) =>
                    createData(id, title, purpose, date)
                  )
                  .map((row, index) => (
                    <Document key={row.id} row={row} />
                  ))}
              </TableBody>
            )}
          </Table>
          {/* <TablePaginationDemo documents={documents}></TablePaginationDemo> */}
        </TableContainer>
      )}
    </div>
  );
}
var checkedRowArr = [];

function Document(props) {
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const { row: documentProps } = props;
  const { fields, searching, refreshFields ,exportDocument } = useDocumentFields();
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [isChecked, setIsChecked] = useState(false);
  function pushCheck(data) {
    setIsChecked(!isChecked);
    let id = data.row.id;
    var index = checkedRowArr.findIndex((v) => v === id);
    index === -1 ? checkedRowArr.push(id) : checkedRowArr.splice(index, 1);
  }

  return (
    <React.Fragment style={Styles.tableBodyStyle}>
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
        <Desktop>
          <TableCell style={Styles.rowValuesStyle}>
            {documentProps.date}
          </TableCell>
        </Desktop>
        <TableCell>
          <FullScreenFieldsCreator
            documentId={documentProps.id}
            refreshFieldsFromFieldsCreator={() =>
              refreshFields(documentProps.id)
            }
          />
        </TableCell>
        <TableCell>
          {isChecked && (
            <>
              <FullScreenEditDocument
                row={documentProps}
              ></FullScreenEditDocument>
              <ExportButton documentId={documentProps.id}></ExportButton>
              <DeleteDocumentDialogs
                documentId={documentProps.id}
              ></DeleteDocumentDialogs>
            </>
          )}
        </TableCell>
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
  const classes = useRowStyles();
  const [toggler, setToggler] = useState(false);
  const imagesArray = [];
  return (
    <React.Fragment>
      {fields
        ?.map(({ id, fieldName, fieldValue, fieldPicture }) =>
          createField(id, fieldName, fieldValue, fieldPicture)
        )
        .map((field, index) => (
          <TableRow key={field.id} className={classes.root}>
            {/* <TableCell style={Styles.fieldRow}></TableCell> */}
            <TableCell style={Styles.fieldRow} colSpan="2" style={Styles.fieldStyle}>
              {field.fieldName}
            </TableCell>
            {field.fieldValue !== null && (
              <TableCell style={Styles.fieldRow} colSpan="2" style={Styles.fieldStyle}>
                {field.fieldValue}
              </TableCell>
            )}

          {field.fieldValue == null && (
            <TableCell colSpan="2" style={Styles.fieldStyle}>

              <Zoom>
                <img src={field.fieldPicture} style={Styles.pictureStyle} />
              </Zoom>
            </TableCell>
          )}
            <TableCell style={Styles.fieldRow}>
              {field.fieldValue!==null && (<EditDialogs
                fieldId={field.id}
                fieldName={field.fieldName}
                fieldValue={field.fieldValue}
                fieldPicture={field.fieldPicture}
                refreshFields={() => refreshFields(rowId)}
              ></EditDialogs>)}
            </TableCell>
            <TableCell style={Styles.fieldRow}>
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
    overflow: "overlay",
    maxWidth: "25vw",
  },
  tableStyle: {
    marginTop: "4em",
  },
  tableHeadStyle: {
    background: "darkseagreen",
  },
  tableBodyStyle: {
    backgroundColor: "wheat",
    borderCollapse: "collapse",
    border: "1px solid black",
  },
  fieldRow: {
    backgroundColor: "burlywood",  
  },
  upperTitleColumnNameStyle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  message: {
    color: "black",
  },
  pictureStyle: {
    width: "5vw",
  },
  documentBorder: {
    borderCollapse: "collapse",
  },
  fieldStyle: {
    color: "black",
    fontFamily: "monospace",
    fontSize: "1em",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "overlay",
    maxWidth: "25vw",
    backgroundColor: "burlywood",  
  },
};
