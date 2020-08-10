import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import * as profileActions from "./profile.actions";

const userEntityAdapter = createEntityAdapter();

const initialState = userEntityAdapter.getInitialState({
  userData: null
});
const reducers = {};

/**
 * Reducer to store selected store id.
 */
reducers[profileActions.fetchUserDataFullfilled] = function(state, action) {
  state.userData = action.payload;
};

/**
 * Logout functionality
 */

reducers[profileActions.logout] = function(state, action) {
  state.userData = null;
};

export default createReducer(initialState, reducers);
