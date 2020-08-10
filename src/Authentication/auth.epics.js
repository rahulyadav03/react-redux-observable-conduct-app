import { ofType } from "redux-observable";
import * as authActions from "./auth.actions";

import { fetchLogin } from "../common/utils/axiosApi";
import { constructError } from "../common/utils/constructError";

import { mergeMap, switchMap, tap, map, catchError } from "rxjs/operators";
import { of, from } from "rxjs";

//import { fetchLogin } from "../common/utils/axiosApi";

import history from "../common/utils/history";
import { ROUTES } from "../common/constants";

import * as profileActions from "../common/ProfileStore/profile.actions";

/**
 * Epic to update the education.
 * @param {Object} action$ The education action stream.
 * @param {Object} store$ The redux store stream.
 */

function fetchToken$(url, data) {
  return from(fetchLogin(url, data)).pipe(
    switchMap(response => {
      if (response.ok) {
        return response.json();
      } else {
        return of(constructError(response));
      }
    }),
    catchError(error => {
      return of(constructError(error));
    })
  );
}

export const submitLoginFormEpic = action$ =>
  action$.pipe(
    ofType(authActions.submitLoginForm),
    switchMap(action => {
      return fetchToken$(action.payload.auth, action.payload.user).pipe(
        map(response => {
          if (response["errors"]) {
            return authActions.loginError(response.errors);
          } else {
            localStorage.setItem("token", response.user.token);
            localStorage.setItem("username", response.user.username);
            return authActions.loginSuccesfully(response);
          }
        }),
        catchError(error => {
          return of(authActions.loginError(error));
        })
      );
    })
  );

export const loginSuccesfullyEpic = (action$, state$) =>
  action$.pipe(
    ofType(authActions.loginSuccesfully),
    tap(() => {
      history.push(ROUTES.HOME);
    }),
    mergeMap(action => {
      return of(authActions.noop());
    })
  );

export const loginErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(authActions.loginError),
    mergeMap(action => {
      return of(authActions.noop());
    })
  );

/**
 * Logout Epic
 */

export const logoutEpic = (action$, state$) =>
  action$.pipe(
    ofType(authActions.logout),
    tap(() => {
      history.push(ROUTES.HOME);
    }),
    mergeMap(action => {
      return of(profileActions.noop());
    })
  );
