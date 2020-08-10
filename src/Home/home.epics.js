import { ofType } from "redux-observable";
import * as homeActions from "./home.actions";

import { fetchGetAll, fetchPost } from "../common/utils/axiosApi";
import { constructError } from "../common/utils/constructError";

import { mergeMap, switchMap, map, catchError } from "rxjs/operators";
import { of, from } from "rxjs";

/**
 * Epic to update the education.
 * @param {Object} action$ The education action stream.
 * @param {Object} store$ The redux store stream.
 */

function fetchGlobalFeed$(url) {
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

/**
 *
 * @param {Set Favourite atricle} action$
 */

function setFavourite$(url) {
  return from(fetchPost(url, {})).pipe(
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

/**
 *
 * @param {Fetch All Global Feed} action$
 */
export const fetchAllGlobalFeedEpic = action$ =>
  action$.pipe(
    ofType(homeActions.fetchAllGlobalFeed),
    switchMap(action => {
      return fetchGlobalFeed$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return homeActions.fetchAllGlobalFeedError(response.errors);
          } else {
            return homeActions.fetchAllGlobalFeedFullfilled(response);
          }
        }),
        catchError(error => {
          return of(homeActions.fetchAllGlobalFeedError(error));
        })
      );
    })
  );

export const fetchAllGlobalFeedFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(homeActions.fetchAllGlobalFeedFullfilled),
    mergeMap(action => {
      return of(homeActions.noop());
    })
  );

export const fetchAllGlobalFeedErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(homeActions.fetchAllGlobalFeedError),
    mergeMap(action => {
      return of(homeActions.noop());
    })
  );

/**
 *
 * @param {Set Current Page Value} action$
 */

export function setCurrentPageValueEpic(action$) {
  return action$.pipe(
    ofType(homeActions.setCurrentPageValue),
    switchMap(action => {
      return of(homeActions.setCurrentPageValueFullfilled(action.payload));
    })
  );
}

/**
 *
 * @param {set Current Page Value} action$
 */
export function setTagNameEpic(action$) {
  return action$.pipe(
    ofType(homeActions.setTagName),
    switchMap(action => {
      return of(homeActions.setTagNameFullfilled(action.payload));
    })
  );
}

/**
 *
 * @param {Save Favourite Article Count} action$
 */
export const setFavouriteArticleEpic = (action$, state$) =>
  action$.pipe(
    ofType(homeActions.setFavouriteArticle),
    switchMap(action => {
      return setFavourite$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return homeActions.setFavouriteArticleError(response.errors);
          } else {
            let globalFeed = state$.value.home.globalFeedData;
            let updatedFeedArray = globalFeed.articles.map(value => {
              if (value.slug == response.article.slug) {
                value = response.article;
              }
              return value;
            });

            let data = {};
            data.articles = updatedFeedArray;
            data.articlesCount = globalFeed.articlesCount;
            return homeActions.setFavouriteArticleFullfilled(data);
          }
        }),
        catchError(error => {
          return of(homeActions.setFavouriteArticleError(error));
        })
      );
    })
  );

export const setFavouriteArticleFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(homeActions.setFavouriteArticleFullfilled),
    mergeMap(action => {
      return of(homeActions.noop());
    })
  );

export const setFavouriteArticleErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(homeActions.fetchAllGlobalFeedError),
    mergeMap(action => {
      return of(homeActions.noop());
    })
  );
