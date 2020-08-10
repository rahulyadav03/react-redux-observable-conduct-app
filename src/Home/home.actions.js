import { createAction } from "@reduxjs/toolkit";

/**
 * fetchingTags
 */

export const fetchAllGlobalFeed = createAction(
  "[Home, GlobalFeed] Fetch All Global Feeds"
);

export const fetchAllGlobalFeedFullfilled = createAction(
  "[Home, GlobalFeed] Global Feed Fetched Succesfully"
);

export const fetchAllGlobalFeedError = createAction(
  "[Home, GlobalFeed] there is some error while fetching global Feed"
);

/**
 * Set current Page Value
 */

export const setCurrentPageValue = createAction(
  "[Home, Pagination] Set Current Page Value"
);

export const setCurrentPageValueFullfilled = createAction(
  "[Home, Pagination] Set Current Page Value Fullfilled"
);

/**
 * SetTagName
 */

export const setTagName = createAction("[Home, PopularTag] Set Tag Name");

export const setTagNameFullfilled = createAction(
  "[Home, PopularTag] Set Tag Name Fullfilled"
);

/**
 * Set favourite Article Count
 */

export const setFavouriteArticle = createAction(
  "[Home, GlobalFeed] Set Favourite Article"
);

export const setFavouriteArticleFullfilled = createAction(
  "[Home, GlobalFeed] Set Favourite Article Fullfilled"
);

export const setFavouriteArticleError = createAction(
  "[Home, GlobalFeed] there is some error while saving favourite article count"
);

export const noop = createAction("NOOP");
