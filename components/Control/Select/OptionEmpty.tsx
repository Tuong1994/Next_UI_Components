import React from "react";

interface OptionEmptyProps {}

const OptionEmpty: React.FC<OptionEmptyProps> = () => {
  return <div className="list-empty">No option</div>;
};

export default OptionEmpty;
