import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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

function createField(id, documentId, fieldName, fieldValue) {
  return {
    id,
    documentId,
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
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            id={row.id}
            aria-label="expand row"
            size="small"
            onClick={() => setSelectedDocumentId(row.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.purpose}</TableCell>
        <TableCell>{row.content}</TableCell>
        <TableCell>{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            id="fieldsContainer"
          ></Collapse>
        </TableCell>
      </TableRow>
      {selectedDocumentId && <Field documentId={selectedDocumentId} />}
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

export default function CollapsibleTable() {
  const { documents, searching } = useDocuments();
  let tableStyle = {
    marginTop: "3em",
  };

  return (
    <TableContainer style={tableStyle} component={Paper} id="documentsTable">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searching && "searching..."}
          {documents
            ?.map(({ id, title, purpose, content, date }) =>
              // esto es una warrada? seteo el id del icono como el id del documento para usarlo en el getFields(docId)
              createData(id, title, purpose, content, date)
            )
            .map((row, index) => (
              <Row key={row.id} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Field({ documentId }) {
  const { fields, searching } = useDocumentFields(documentId);

  return (
    <Box margin={1}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searching && "searching..."}
          {fields
            ?.map(({ id, documentId, fieldName, fieldValue }) =>
              createField(id, documentId, fieldName, fieldValue)
            )
            .map((row) => (
              <Field key={row.title} row={row} />
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
