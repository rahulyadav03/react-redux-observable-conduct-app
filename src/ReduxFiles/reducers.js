import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "../Authentication/auth.reducers";
import tagsReducer from "../common/tagsRedux/tags.reducers";
import homeReducer from "../Home/home.reducers";
import profileReducer from "../common/ProfileStore/profile.reducers";
import articleReducer from "../Articles/articles.reducers";

/**
 * Encompasses all the reducers into one global reducer
 * that is served to the store.
 */
const reducer = combineReducers({
  auth: authReducers,
  popularTags: tagsReducer,
  home: homeReducer,
  profile: profileReducer,
  article: articleReducer
});

export default reducer;
