import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import * as homeActions from "./home.actions";

const homeEntityAdapter = createEntityAdapter();

const initialState = homeEntityAdapter.getInitialState({
  globalFeedData: null,
  errors: null,
  setCurrentPage: 0,
  setTagName: null
});
const reducers = {};

/**
 *
 * @param {Object} action LoginRegister Modal.
 */
reducers[homeActions.fetchAllGlobalFeedFullfilled] = function(state, action) {
  state.globalFeedData = action.payload;
};

/**
 * Set Current Page Reducer
 */

reducers[homeActions.setCurrentPageValueFullfilled] = function(state, action) {
  state.setCurrentPage = action.payload;
};

/**
 * SeT Tag Name
 */

reducers[homeActions.setTagNameFullfilled] = function(state, action) {
  state.setTagName = action.payload;
};

/**
 * SeT Favourite article Count
 */

reducers[homeActions.setFavouriteArticleFullfilled] = function(state, action) {
  state.globalFeedData = action.payload;
};

export default createReducer(initialState, reducers);
