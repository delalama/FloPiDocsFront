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

function createData(id,title, purpose, content, date, protein, price) {
  return {
    id,
    title,
    purpose,
    content,
    date,
    id,
    protein,
    price,
    history: [
      {
        name: "history",
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
    field: [
      { concept: "2020-01-05", value: "11091700" },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function createField(fields) {
  return {
    fields: [
      fields.fieldName,
      fields.fieldValue
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  var documentId = '';
  const { fields, searching } = useDocumentFields(documentId);

  function openAndGetFields(event) {
    if(event.target.tagName === 'svg'){documentId = event.target.parentNode.parentElement.id;}
    
    console.log(fields);
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell >
          <IconButton
            id={row.id}
            aria-label="expand row"
            size="small"
            onClick={openAndGetFields}
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">Fields</Typography> */}
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
                    ?.map(({ fieldName, fieldValue }) =>
                      createData(fields.concept = fieldName, fieldValue)
                    )
                    .map((row) => (
                      <Row key={row.title} row={row} />
                    ))}
                </TableBody>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        customerId: PropTypes.string,
        date: PropTypes.string,
      })
    ).isRequired,
    field: PropTypes.arrayOf(
      PropTypes.shape({
        fieldName: PropTypes.number,
        fieldValue: PropTypes.string,
      })
    ).isRequired,
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
            ?.map(({ id,title, purpose, content, date }) =>
            // esto es una warrada? seteo el id del icono como el id del documento para usarlo en el getFields(docId)
              createData(id,title, purpose, content, date)
            )
            .map((row) => (
              <Row key={row.title} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
