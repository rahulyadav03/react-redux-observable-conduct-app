import { createAction } from "@reduxjs/toolkit";

/**
 * Login With Email and Password
 */

export const fetchAllAuthorArticles = createAction(
  "[Articles, MyArticle] fetch all articles related to a particular author"
);

export const fetchAllAuthorArticlesFullfilled = createAction(
  "[Articles, MyArticle] All author related articled fetch succesfully"
);

export const fetchAllAuthorArticlesError = createAction(
  "[Articles, MyArticle] there is some error while fetching user articles"
);

/**
 * Set current Page Value
 */

export const setCurrentPageValue = createAction(
  "[Articles, MyArticle] Set Current Page Value"
);

export const setCurrentPageValueFullfilled = createAction(
  "[Articles, MyArticle] Set Current Page Value Fullfilled"
);

/**
 * Fetch User article description
 */

export const fetchArticleDescription = createAction(
  "[Articles, ArticleDescription] fetch articles description related to a particular author"
);

export const fetchArticleDescriptionsFullfilled = createAction(
  "[Articles, ArticleDescription] All author related articles description fetch succesfully"
);

export const fetchArticleDescriptionError = createAction(
  "[Articles, ArticleDescription] there is some error while fetching user articles description"
);

/**
 * Fetch Article Comment
 */

export const fetchArticleComments = createAction(
  "[Articles, ArticleDescription] fetch articles comments related to a particular author"
);

export const fetchArticleCommentsFullfilled = createAction(
  "[Articles, ArticleDescription] All author related comments description fetch succesfully"
);

export const fetchArticleCommentsError = createAction(
  "[Articles, ArticleDescription] there is some error while fetching user articles comments"
);

/**
 * Set Delete Comment
 */

export const setUpdateComment = createAction(
  "[Articles, ArticleDescription] Set Update Comment"
);

/**
 * Delete Comment
 */

export const deleteComment = createAction(
  "[Articles, ArticleDescription] Delete Comment"
);

export const deleteCommentFullfilled = createAction(
  "[Articles, ArticleDescription] Delete Comment Fullfilled"
);

export const deleteCommentError = createAction(
  "[Articles, ArticleDescription] Delete Comment Error"
);

/**
 * Save Comment
 */
export const saveComment = createAction(
  "[Articles, ArticleDescription] save articles comments related to a particular author"
);

export const saveCommentFullfilled = createAction(
  "[Articles, ArticleDescription] Author related comments saved succesfully"
);

export const saveCommentError = createAction(
  "[Articles, ArticleDescription] there is some error while saving some user articles comments"
);

/**
 * Save New Article
 */
export const saveArticle = createAction(
  "[Articles, ArticleDescription] save articles related to a particular author"
);

export const saveArticleFullfilled = createAction(
  "[Articles, ArticleDescription] Author related saved succesfully"
);

export const saveArticleError = createAction(
  "[Articles, ArticleDescription] there is some error while saving some user articles"
);

/**
 * Delete Article
 */

export const deleteArticle = createAction(
  "[Articles, ArticleDescription] Delete Article"
);

export const deleteArticleFullfilled = createAction(
  "[Articles, ArticleDescription] Delete Article Fullfilled"
);

export const deleteArticleError = createAction(
  "[Articles, ArticleDescription] Delete Article Error"
);

/**
 * UpdateArticle
 */

export const updateArticle = createAction(
  "[Articles, ArticleDescription] Update Article"
);

/**
 * Set favourite Article Count
 */

export const setFavouriteArticle = createAction(
  "[Articles, MyArticle] Set Favourite Article"
);

export const setFavouriteArticleFullfilled = createAction(
  "[Articles, MyArticle] Set Favourite Article Fullfilled"
);

export const setFavouriteArticleError = createAction(
  "[Articles, MyArticle] there is some error while saving favourite article count"
);

/**
 * Loading flag
 */

export const setLoadingFlag = createAction(
  "[Articles, MyArticle] set loading flag"
);

export const noop = createAction("NOOP");
