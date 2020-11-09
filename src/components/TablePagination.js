import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import useTotalDocuments from '../request/useTotalDocuments';

function TablePaginationDemo() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //DEADVID , object is not a function......??
//   const [totalDocuments, setTotalDocuments] = useTotalDocuments();  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatorStyle = {
    "background-color" : 'aquamarine',
  }

  return (
    <TablePagination
      style={paginatorStyle}
      component="div"
    //   count={100}
      count={100}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
export default TablePaginationDemo