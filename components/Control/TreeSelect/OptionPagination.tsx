import React from "react";
import { HiOutlineChevronRight as ArrowRight, HiOutlineChevronLeft as ArrowLeft } from "react-icons/hi2";

interface OptionPaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  handleChangePage: (type: "prev" | "next") => void;
}

const OptionPagination: React.FC<OptionPaginationProps> = ({
  currentPage,
  totalPages,
  loading,
  handleChangePage,
}) => {
  const prevBtnDisabled = currentPage === 1 || loading;

  const nextBtnDisabled = currentPage === totalPages || loading;

  const prevBtnDisabledClassName = prevBtnDisabled ? "actions-btn-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "actions-btn-disabled" : "";

  return (
    <div className="option-pagination">
      <div className="pagination-content">
        {currentPage} / {totalPages}
      </div>
      <div className="pagination-actions">
        <button
          type="button"
          disabled={prevBtnDisabled}
          className={`actions-btn ${prevBtnDisabledClassName}`}
          onClick={() => handleChangePage("prev")}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          disabled={nextBtnDisabled}
          className={`actions-btn ${nextBtnDisabledClassName}`}
          onClick={() => handleChangePage("next")}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default OptionPagination;
