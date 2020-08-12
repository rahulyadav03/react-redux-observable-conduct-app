import {
  createEntityAdapter,
  createReducer,
  createSelector
} from "@reduxjs/toolkit";
import * as authActions from "./auth.actions";

const loginEntityAdapter = createEntityAdapter();

const initialState = loginEntityAdapter.getInitialState({
  loginData: null,
  errors: null,
  loading: false
});
const reducers = {};

/**
 *
 * @param {Object} action LoginRegister Modal.
 */
reducers[authActions.loginSuccesfully] = function(state, action) {
  state.loginData = action.payload;
  state.errors = null;
  state.loading = false;
};

reducers[authActions.loginError] = function(state, action) {
  state.loginData = null;
  state.errors = action.payload;
  state.loading = false;
};

/**
 * Logout functionality
 */

reducers[authActions.logout] = function(state, action) {
  state.loginData = null;
  state.errors = null;
  state.loading = false;
};

//selector for current page name
const fetchLoadingData = state => state.auth.loading;
export const fetchAuthLoadingFlag = createSelector(
  [fetchLoadingData],
  fetchLoadingData => fetchLoadingData
);

reducers[authActions.setLoadingFlag] = function(state, action) {
  state.loading = action.payload;
};

export default createReducer(initialState, reducers);
