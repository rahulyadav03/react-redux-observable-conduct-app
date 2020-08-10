import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

export const epicMiddleware = createEpicMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false
  }),
  epicMiddleware
];

export default middleware;
