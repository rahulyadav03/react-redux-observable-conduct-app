import React from "react";

function Feed(props) {
  const { data, fnFavourite } = props;
  return (
    <div
      className="feed-details customCursor"
      onClick={() => props.handleClick(data)}
    >
      {/* */}
      <div className="feed-details-header">
        <div className="feed-details-header-left-section flex-grow-1">
          <img
            src={
              data.author.image
                ? data.author.image
                : "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            className="feed-details-header-left-section-img"
            alt="feed"
          />
          <div className="feed-details-header-left-section-title">
            <span className="spanTitle">{data.author.username}</span>
            <span>{new Date(data.createdAt).toDateString()}</span>
          </div>
        </div>

        <div className="feed-details-header-right-section">
          <button
            className={`btn btn-sm ${
              data.favorited ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={e => fnFavourite(e, data)}
          >
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span className="pl-2">{data.favoritesCount}</span>
          </button>
        </div>
      </div>

      <div className="feed-title-section">
        <h6>{data.title}</h6>
        <p>{data.body}</p>
      </div>
      <div className="read-more-section">
        <p className="flex-grow-1">Read More....</p>
        <ul className="tag-list">
          {data.tagList.map((value, index) => (
            <li key={index}>value</li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}

export default Feed;
