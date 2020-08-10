import {
  createEntityAdapter,
  createReducer,
  createSelector
} from "@reduxjs/toolkit";
import * as tagsActions from "./tags.actions";

const tagsEntityAdapter = createEntityAdapter();

const initialState = tagsEntityAdapter.getInitialState({
  allTags: null
});
const reducers = {};

/**
 * Reducer to store selected store id.
 */
reducers[tagsActions.fetchAllTagsFullfilled] = function(state, action) {
  state.allTags = action.payload;
};

//selector for current page name
const fetchAllTags = state => state.popularTags.allTags;
export const fetchSetTagNameData = createSelector(
  [fetchAllTags],
  fetchAllTags => fetchAllTags
);

export default createReducer(initialState, reducers);
