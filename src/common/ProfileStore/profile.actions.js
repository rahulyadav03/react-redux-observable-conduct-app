import { createAction } from "@reduxjs/toolkit";

/**
 * fetchingTags
 */

export const fetchUserData = createAction(
  "[Home, ListArticle] Fetch User Information"
);

export const fetchUserDataFullfilled = createAction(
  "[Home, ListArticle] User data Fetched Succesfully"
);

export const fetchUserDataError = createAction(
  "[Home, ListArticle] there is some error while fetching user information"
);

/**
 * Remove User Info
 */
export const logout = createAction("[Auth, Header] logout");

export const noop = createAction("NOOP");
