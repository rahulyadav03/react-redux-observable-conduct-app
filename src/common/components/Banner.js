import React from "react";

function Banner(props) {
  return (
    <div className="text-center">
      {props.heading && <h1>{props.heading}</h1>}
      {props.url && (
        <img
          src={props.url}
          className="rounded-circle mt-3 bannerImg"
          alt="banner"
        />
      )}
      <p className="mt-2">{props.title}</p>
    </div>
  );
}

export default Banner;
