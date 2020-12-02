import React, { useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import useTotalDocuments from "../request/useTotalDocuments";

function TablePaginationDemo({ documents }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {console.log(documents)}
      <TablePagination
        style={Styles.paginatorStyle}
        component="div"
        count={documents.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
export default TablePaginationDemo;

const Styles = {
  paginatorStyle: {
    backgroundColor: "aquamarine",
  },
};
