import { createAction } from "@reduxjs/toolkit";

/**
 * Login With Email and Password
 */

export const submitLoginForm = createAction(
  "[Auth, Signin] Check for Authenticate User"
);

export const loginSuccesfully = createAction(
  "[Auth, Signin] Login succesfully"
);

export const loginError = createAction("[Auth, Signin] Login Error");

/**
 * Register With Username, Email and Password
 */

export const submitRegisterForm = createAction(
  "[Auth, Signup] Save User data in data base"
);

export const registerSuccesfully = createAction(
  "[Auth, Signup] User data save succesfully"
);

export const registerError = createAction("[Auth, Signup] Register Error");

/**
 * Remove User Info
 */
export const logout = createAction("[Auth, Header] logout");

export const noop = createAction("NOOP");
