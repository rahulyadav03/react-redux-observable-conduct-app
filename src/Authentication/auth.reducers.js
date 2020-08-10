import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import * as authActions from "./auth.actions";

const loginEntityAdapter = createEntityAdapter();

const initialState = loginEntityAdapter.getInitialState({
  loginData: null,
  errors: null
});
const reducers = {};

/**
 *
 * @param {Object} action LoginRegister Modal.
 */
reducers[authActions.loginSuccesfully] = function(state, action) {
  state.loginData = action.payload;
  state.errors = null;
};

reducers[authActions.loginError] = function(state, action) {
  state.loginData = null;
  state.errors = action.payload;
};

/**
 * Logout functionality
 */

reducers[authActions.logout] = function(state, action) {
  state.loginData = null;
  state.errors = null;
};

export default createReducer(initialState, reducers);
