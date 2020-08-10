import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import middleware, { epicMiddleware } from "./middleware";
import rootEpic from "./epic";

const store = configureStore({
  reducer,
  middleware
});

epicMiddleware.run(rootEpic);

export default store;
