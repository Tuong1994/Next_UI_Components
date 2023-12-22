import React from "react";
import { Spinner } from "@/components/UI/Loading";

interface SingleImageUploadLoadingProps {}

const SingleImageUploadLoading: React.FC<SingleImageUploadLoadingProps> = () => {
  return (
    <div className="group-loading">
      <Spinner />
    </div>
  );
};

export default SingleImageUploadLoading;
