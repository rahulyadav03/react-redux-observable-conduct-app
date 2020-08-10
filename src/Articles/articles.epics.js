import { ofType } from "redux-observable";
import * as articleActions from "./acticles.actions";

import {
  fetchGet,
  deleteAPI,
  fetchPost,
  fetchPut
} from "../common/utils/axiosApi";
import { constructError } from "../common/utils/constructError";

import {
  mergeMap,
  switchMap,
  tap,
  map,
  catchError,
  ignoreElements
} from "rxjs/operators";
import { of, from } from "rxjs";

import history from "../common/utils/history";
import { ROUTES } from "../common/constants";

/**
 * Epic to update the education.
 * @param {Object} action$ The education action stream.
 * @param {Object} store$ The redux store stream.
 */

function fetchUserArticle$(url) {
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
 * @param {Update API method} url
 */

function updateArticle$(url, data) {
  return from(fetchPut(url, data)).pipe(
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

function saveComments$(url, data) {
  return from(fetchPost(url, data)).pipe(
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

function deleteComment$(url) {
  return from(deleteAPI(url)).pipe(
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

export const fetchAllAuthorArticlesEpic = action$ =>
  action$.pipe(
    ofType(articleActions.fetchAllAuthorArticles),
    switchMap(action => {
      return fetchUserArticle$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.fetchAllAuthorArticlesError(response.errors);
          } else {
            return articleActions.fetchAllAuthorArticlesFullfilled(response);
          }
        }),
        catchError(error => {
          return of(articleActions.fetchAllAuthorArticlesError(error));
        })
      );
    })
  );

export const fetchAllAuthorArticlesFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchAllAuthorArticlesFullfilled),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const fetchAllAuthorArticlesErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchAllAuthorArticlesError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 *
 * @param {Fetch Article Description} action$
 */

export const fetchArticleDescriptionEpic = action$ =>
  action$.pipe(
    ofType(articleActions.fetchArticleDescription),
    switchMap(action => {
      return fetchUserArticle$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.fetchArticleDescriptionError(response.errors);
          } else {
            return articleActions.fetchArticleDescriptionsFullfilled(response);
          }
        }),
        catchError(error => {
          return of(articleActions.fetchArticleDescriptionError(error));
        })
      );
    })
  );

export const fetchArticleDescriptionsFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchArticleDescriptionsFullfilled),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const fetchArticleDescriptionErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchArticleDescriptionError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 *
 * @param {Fetch Article Comments} action$
 */

export const fetchArticleCommentsEpic = action$ =>
  action$.pipe(
    ofType(articleActions.fetchArticleComments),
    switchMap(action => {
      return fetchUserArticle$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.fetchArticleCommentsError(response.errors);
          } else {
            return articleActions.fetchArticleCommentsFullfilled(response);
          }
        }),
        catchError(error => {
          return of(articleActions.fetchArticleCommentsError(error));
        })
      );
    })
  );

export const fetchArticleCommentsFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchArticleCommentsFullfilled),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const fetchArticleCommentsErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.fetchArticleCommentsError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 *
 * @param {Set Current Page Value} action$
 */

export function setCurrentPageValueEpic(action$) {
  return action$.pipe(
    ofType(articleActions.setCurrentPageValue),
    switchMap(action => {
      return of(articleActions.setCurrentPageValueFullfilled(action.payload));
    })
  );
}

/**
 *
 * @param {Set Current Page Value} action$
 */

export function setUpdateCommentEpic(action$) {
  return action$.pipe(
    ofType(articleActions.setUpdateComment),
    switchMap(action => {
      return of(articleActions.fetchArticleCommentsFullfilled(action.payload));
    })
  );
}

/**
 *
 * @param {Delete Current Page Value} action$
 */

export const deleteCommentEpic = action$ =>
  action$.pipe(
    ofType(articleActions.deleteComment),
    switchMap(action => {
      return deleteComment$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.fetchArticleCommentsError(response.errors);
          } else {
            return articleActions.noop();
          }
        }),
        catchError(error => {
          return of(articleActions.fetchArticleCommentsError(error));
        })
      );
    })
  );

/**
 * save Comments to data Base
 */

export const saveCommentEpic = action$ =>
  action$.pipe(
    ofType(articleActions.saveComment),
    switchMap(action => {
      return saveComments$(action.payload.url, action.payload.commentData).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.saveCommentError(response.errors);
          } else {
            return articleActions.saveCommentFullfilled(response);
          }
        }),
        catchError(error => {
          return of(articleActions.saveCommentError(error));
        })
      );
    })
  );

export const saveCommentFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.saveCommentFullfilled),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const saveCommentErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.saveCommentError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 * Update Article to data Base
 */

export const updateArticleEpic = action$ =>
  action$.pipe(
    ofType(articleActions.updateArticle),
    switchMap(action => {
      return updateArticle$(action.payload.url, action.payload.data).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.saveArticleError(response.errors);
          } else {
            return articleActions.saveArticleFullfilled(response);
          }
        }),
        catchError(error => {
          return of(articleActions.saveArticleError(error));
        })
      );
    })
  );

/**
 * save Article to data Base
 */

export const saveArticleEpic = action$ =>
  action$.pipe(
    ofType(articleActions.saveArticle),
    mergeMap(action =>
      saveComments$(action.payload.url, action.payload.data).pipe(
        map(response => articleActions.saveArticleFullfilled(response)),
        catchError(error =>
          of({
            type: articleActions.saveArticleError,
            payload: error.xhr.response,
            error: true
          })
        )
      )
    )
  );

export const saveArticleFullfilledEpic = action$ =>
  action$.pipe(
    ofType(articleActions.saveArticleFullfilled),
    tap(response => {
      history.push(`/article/${response.payload.article.slug}`);
    }),
    ignoreElements()
  );

export const saveArticleErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.saveArticleError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 *
 * @param {Delete article} action$
 */

export const deleteArticleEpic = action$ =>
  action$.pipe(
    ofType(articleActions.deleteArticle),
    switchMap(action => {
      return deleteComment$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.deleteArticleError(response.errors);
          } else {
            return articleActions.deleteArticleFullfilled();
          }
        }),
        catchError(error => {
          return of(articleActions.deleteArticleError(error));
        })
      );
    })
  );

export const deleteArticleFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.deleteArticleFullfilled),
    tap(() => {
      history.push(ROUTES.HOME);
    }),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const deleteArticleErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.deleteArticleError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

/**
 *
 * @param {Save Favourite Article Count} action$
 */
export const setFavouriteArticleEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.setFavouriteArticle),
    switchMap(action => {
      return setFavourite$(action.payload).pipe(
        map(response => {
          if (response["errors"]) {
            return articleActions.setFavouriteArticleError(response.errors);
          } else {
            let globalFeed = state$.value.article.userArticles;
            let updatedFeedArray = globalFeed.articles.map(value => {
              if (value.slug == response.article.slug) {
                value = response.article;
              }
              return value;
            });

            let data = {};
            data.articles = updatedFeedArray;
            data.articlesCount = globalFeed.articlesCount;
            return articleActions.setFavouriteArticleFullfilled(data);
          }
        }),
        catchError(error => {
          return of(articleActions.setFavouriteArticleError(error));
        })
      );
    })
  );

export const setFavouriteArticleFullfilledEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.setFavouriteArticleFullfilled),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );

export const setFavouriteArticleErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(articleActions.setFavouriteArticleError),
    mergeMap(action => {
      return of(articleActions.noop());
    })
  );
