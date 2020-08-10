import { ofType } from "redux-observable";
import * as tagsAction from "./tags.actions";
import serverApi from "../utils/apiUrl";
import lodashGet from "lodash.get";

import { fetchGetAll } from "../utils/axiosApi";
import { constructError } from "../utils/constructError";

import { mergeMap, switchMap, map, catchError } from "rxjs/operators";
import { of, from } from "rxjs";

/**
 * Epic to update the education.
 * @param {Object} action$ The education action stream.
 * @param {Object} store$ The redux store stream.
 */

function fetchPopularTags$(url) {
  return from(fetchGetAll(url)).pipe(
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

export const fetchAllTagsEpic = action$ =>
  action$.pipe(
    ofType(tagsAction.fetchAllTags),
    switchMap(action => {
      return fetchPopularTags$(serverApi.Tags.allTags).pipe(
        map(response => {
          lodashGet(response, "data.values", []);
          if (response["errors"]) {
            return tagsAction.fetchAllTagsError(response.errors);
          } else {
            return tagsAction.fetchAllTagsFullfilled(response);
          }
        }),
        catchError(error => {
          return of(tagsAction.fetchAllTagsError(error));
        })
      );
    })
  );

export const fetchAllTagsFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(tagsAction.fetchAllTagsFullfilled),
    mergeMap(action => {
      return of(tagsAction.noop());
    })
  );

export const fetchAllTagsErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(tagsAction.fetchAllTagsError),
    mergeMap(action => {
      return of(tagsAction.noop());
    })
  );
