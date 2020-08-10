import React from "react";

function PopularTag(props) {
  const { allTags, fnFetchTagData } = props;
  if (allTags) {
    return (
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 popular-tag">
        <p>Popular Tag</p>
        <div className="tag-section">
          {allTags.tags.map((data, index) => (
            <div
              className="tag-default"
              key={index}
              onClick={() => fnFetchTagData(data)}
            >
              <span>{data}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default PopularTag;
