import React from "react";
import Spinner from "@/components/UI/Loading/Spinner";

const TableLoading: React.FC<{}> = () => {
  return <div className="table-loading">
    <Spinner size={6} type="bubble" color="black" />
  </div>;
};

export default TableLoading;
