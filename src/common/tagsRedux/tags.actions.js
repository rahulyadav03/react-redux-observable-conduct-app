import { createAction } from "@reduxjs/toolkit";

/**
 * fetchingTags
 */

export const fetchAllTags = createAction(
  "[Home, PopularTags] Fetch All Popular Tags"
);

export const fetchAllTagsFullfilled = createAction(
  "[Home, PopularTags] Tags Fetched Succesfully"
);

export const fetchAllTagsError = createAction(
  "[Home, PopularTags] there is some error while fetching tags"
);

export const noop = createAction("NOOP");
