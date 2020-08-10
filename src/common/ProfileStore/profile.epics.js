import { ofType } from "redux-observable";
import * as profileActions from "./profile.actions";

import { fetchGet } from "../utils/axiosApi";
import { constructError } from "../utils/constructError";

import { mergeMap, switchMap, map, catchError } from "rxjs/operators";
import { of, from } from "rxjs";

/**
 * Epic to update the education.
 * @param {Object} action$ The education action stream.
 * @param {Object} store$ The redux store stream.
 */

function fetchUserData$(url) {
  return from(fetchGet(url)).pipe(
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

export const fetchUserDataEpic = action$ =>
  action$.pipe(
    ofType(profileActions.fetchUserData),
    switchMap(action => {
      return fetchUserData$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return profileActions.fetchUserDataError(response.errors);
          } else {
            return profileActions.fetchUserDataFullfilled(response);
          }
        }),
        catchError(error => {
          return of(profileActions.fetchUserDataError(error));
        })
      );
    })
  );

export const fetchUserDataFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(profileActions.fetchUserDataFullfilled),
    mergeMap(action => {
      return of(profileActions.noop());
    })
  );

export const fetchUserDataErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(profileActions.fetchUserDataError),
    mergeMap(action => {
      return of(profileActions.noop());
    })
  );

/**
 * Logout Epic
 */

export const logoutEpic = (action$, state$) =>
  action$.pipe(
    ofType(profileActions.logout),
    mergeMap(action => {
      return of(profileActions.noop());
    })
  );
