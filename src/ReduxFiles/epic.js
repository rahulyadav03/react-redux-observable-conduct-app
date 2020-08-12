import { combineEpics } from "redux-observable";
import * as authEpics from "../Authentication/auth.epics";
import * as tagsEpic from "../common/tagsRedux/tags.epic";
import * as homeEpic from "../Home/home.epics";
import * as profileEpic from "../common/ProfileStore/profile.epics";
import * as articlesEpic from "../Articles/articles.epics";

const rootEpic = combineEpics(
  authEpics.submitLoginFormEpic,
  authEpics.loginSuccesfullyEpic,
  authEpics.loginErrorEpic,
  authEpics.logoutEpic,
  authEpics.setLoadingFlagEpic,

  //Tags Epic
  tagsEpic.fetchAllTagsEpic,
  tagsEpic.fetchAllTagsFullfilledEpic,
  tagsEpic.fetchAllTagsErrorEpic,

  //Home Epic
  homeEpic.fetchAllGlobalFeedEpic,
  homeEpic.fetchAllGlobalFeedFullfilledEpic,
  homeEpic.fetchAllGlobalFeedErrorEpic,
  homeEpic.setCurrentPageValueEpic,
  homeEpic.setTagNameEpic,
  homeEpic.setLoadingFlagEpic,

  homeEpic.setFavouriteArticleEpic,
  homeEpic.setFavouriteArticleFullfilledEpic,
  homeEpic.setFavouriteArticleErrorEpic,

  //Profile Epic
  profileEpic.fetchUserDataEpic,
  profileEpic.fetchUserDataFullfilledEpic,
  profileEpic.fetchUserDataErrorEpic,
  profileEpic.logoutEpic,

  //User Articles
  articlesEpic.fetchAllAuthorArticlesEpic,
  articlesEpic.fetchAllAuthorArticlesFullfilledEpic,
  articlesEpic.fetchAllAuthorArticlesErrorEpic,
  articlesEpic.setCurrentPageValueEpic,
  articlesEpic.fetchArticleDescriptionEpic,
  articlesEpic.fetchArticleDescriptionsFullfilledEpic,
  articlesEpic.fetchArticleDescriptionErrorEpic,
  articlesEpic.fetchArticleCommentsEpic,
  articlesEpic.fetchArticleCommentsFullfilledEpic,
  articlesEpic.fetchArticleCommentsErrorEpic,
  articlesEpic.setUpdateCommentEpic,
  articlesEpic.deleteCommentEpic,
  articlesEpic.saveCommentEpic,
  articlesEpic.saveCommentFullfilledEpic,
  articlesEpic.saveCommentErrorEpic,
  articlesEpic.saveArticleEpic,
  articlesEpic.saveArticleFullfilledEpic,
  articlesEpic.saveArticleErrorEpic,
  articlesEpic.setLoadingFlagEpic,

  articlesEpic.deleteArticleEpic,
  articlesEpic.deleteArticleFullfilledEpic,
  articlesEpic.deleteArticleErrorEpic,

  articlesEpic.updateArticleEpic,

  articlesEpic.setFavouriteArticleEpic,
  articlesEpic.setFavouriteArticleFullfilledEpic,
  articlesEpic.setFavouriteArticleErrorEpic
);

export default rootEpic;
