import {
  createEntityAdapter,
  createReducer,
  createSelector
} from "@reduxjs/toolkit";
import * as homeActions from "./home.actions";

const homeEntityAdapter = createEntityAdapter();

const initialState = homeEntityAdapter.getInitialState({
  globalFeedData: null,
  errors: null,
  setCurrentPage: 0,
  setTagName: null,
  loading: false
});
const reducers = {};

/**
 *
 * @param {Object} action LoginRegister Modal.
 */
reducers[homeActions.fetchAllGlobalFeedFullfilled] = function(state, action) {
  state.globalFeedData = action.payload;
  state.loading = false;
};

const allGlobalData = state => state.home.globalFeedData;
export const fetchAllGlobalFeedData = createSelector(
  [allGlobalData],
  allGlobalData => allGlobalData
);

/**
 * Set Current Page Reducer
 */

reducers[homeActions.setCurrentPageValueFullfilled] = function(state, action) {
  state.setCurrentPage = action.payload;
};

//selector for current page name
const fetchCurrentPage = state => state.home.setCurrentPage;
export const fetchCurrentPageData = createSelector(
  [fetchCurrentPage],
  fetchCurrentPage => fetchCurrentPage
);

/**
 * SeT Tag Name
 */

reducers[homeActions.setTagNameFullfilled] = function(state, action) {
  state.setTagName = action.payload;
};

//selector for current page name
const fetchTagName = state => state.home.setTagName;
export const fetchSetTagNameData = createSelector(
  [fetchTagName],
  fetchTagName => fetchTagName
);

/**
 * SeT Favourite article Count
 */

reducers[homeActions.setFavouriteArticleFullfilled] = function(state, action) {
  state.globalFeedData = action.payload;
};

/**
 * SeT Favourite article Count
 */

//selector for current page name
const fetchLoadingData = state => state.home.loading;
export const fetchSetLoadingFalg = createSelector(
  [fetchLoadingData],
  fetchLoadingData => fetchLoadingData
);

reducers[homeActions.setLoadingFlag] = function(state, action) {
  state.loading = action.payload;
};

export default createReducer(initialState, reducers);
