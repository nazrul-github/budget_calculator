import React, { createContext } from "react";

const itemContext = createContext({
  editItemHandler: () => {},
  deleteItemHandler: () => {}
});

export default itemContext;
