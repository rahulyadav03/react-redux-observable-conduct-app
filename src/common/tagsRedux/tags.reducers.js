import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
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

export default createReducer(initialState, reducers);
