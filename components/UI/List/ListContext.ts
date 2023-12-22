import React from "react";

export type ListContextState = {
  icon?: React.ReactNode | React.ReactNode[];
};

const ListContext = React.createContext<ListContextState>({});

export default ListContext;
