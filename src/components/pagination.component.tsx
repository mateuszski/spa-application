import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.styles.scss";
interface PaginationProps {
  maxPage: number;
  currentPage: number;
  changePage: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  maxPage,
  currentPage,
  changePage,
}) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={maxPage}
        forcePage={currentPage - 1}
        onPageChange={changePage}
      />
    </div>
  );
};
