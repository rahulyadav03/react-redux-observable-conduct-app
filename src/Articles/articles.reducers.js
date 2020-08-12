import {
  createEntityAdapter,
  createReducer,
  createSelector
} from "@reduxjs/toolkit";
import * as articleActions from "./acticles.actions";

const userArticleEntityAdapter = createEntityAdapter();

const initialState = userArticleEntityAdapter.getInitialState({
  userArticles: null,
  setCurrentPage: 0,
  favouriteArticle: null,
  articleDescription: null,
  articleComments: null,
  loading: false
});
const reducers = {};

/**
 * Reducer to store selected store id.
 */
reducers[articleActions.fetchAllAuthorArticlesFullfilled] = function(
  state,
  action
) {
  state.userArticles = action.payload;
  state.loading = false;
};

/**
 * Set Current Page Reducer
 */

reducers[articleActions.setCurrentPageValueFullfilled] = function(
  state,
  action
) {
  state.setCurrentPage = action.payload;
};

/**
 * Set Article Description
 */

reducers[articleActions.fetchArticleDescriptionsFullfilled] = function(
  state,
  action
) {
  state.articleDescription = action.payload;
  state.loading = false;
};

/**
 * Set Article Comments
 */

reducers[articleActions.fetchArticleCommentsFullfilled] = function(
  state,
  action
) {
  state.articleComments = action.payload;
};

/**
 * Set Article Comments
 */

reducers[articleActions.saveCommentFullfilled] = function(state, action) {
  let newData = [];
  if (state.articleComments) {
    newData = {
      comments: [...state.articleComments.comments, action.payload.comment]
    };
  }

  state.articleComments = newData;
};

/**
 * Save Article data
 */
reducers[articleActions.saveArticleFullfilled] = function(state, action) {
  state.articleDescription = action.payload;
  state.loading = false;
};

/**
 * delete Article data
 */
reducers[articleActions.deleteArticleFullfilled] = function(state, action) {
  state.articleDescription = null;
};

/**
 * Reducer to store selected all articles.
 */
reducers[articleActions.setFavouriteArticleFullfilled] = function(
  state,
  action
) {
  state.userArticles = action.payload;
};

//selector for current page name
const fetchArticleLoadingData = state => state.article.loading;
export const fetchSetLoadingFalg = createSelector(
  [fetchArticleLoadingData],
  fetchArticleLoadingData => fetchArticleLoadingData
);
/**
 * Reducer to store selected all articles.
 */
reducers[articleActions.setLoadingFlag] = function(state, action) {
  state.loading = action.payload;
};

export default createReducer(initialState, reducers);
