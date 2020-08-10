import React from "react";
import Feed from "../../common/components/Feed";
function GlobalFeed(props) {
  const {
    allGlobalFeed,
    setTagName,
    fnFetchGlobalFeedData,
    fnFavourite
  } = props;
  return (
    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 global-feed">
      <div className="d-flex">
        <h5
          className={!setTagName ? "global-feed-title" : "customCursor"}
          onClick={() => fnFetchGlobalFeedData()}
        >
          Global Feed
        </h5>
        {setTagName && (
          <h5 className={setTagName ? "global-feed-title ml-2" : null}>
            # {setTagName}
          </h5>
        )}
      </div>

      {allGlobalFeed &&
        allGlobalFeed.articles.map((data, index) => (
          <Feed
            {...props}
            key={data.slug}
            data={data}
            fnFavourite={fnFavourite}
          />
        ))}
    </div>
  );
}

export default GlobalFeed;
