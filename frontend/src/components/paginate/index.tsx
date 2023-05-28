import React from "react";
import ReactPaginate from "react-paginate";

import style from "./index.module.scss";

type paginate = {
  pageCount: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
};

const Paginate: React.FC<paginate> = (props) => {
  const { onPageChange, pageCount } = props;
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      initialPage={1}
    />
  );
};

export default Paginate;
