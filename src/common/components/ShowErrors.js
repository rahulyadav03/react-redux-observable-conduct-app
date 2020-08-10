import React from "react";

function ShowErrors(props) {
  const { errors } = props;
  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map(key => {
          return (
            <li key={key}>
              {key} {errors[key]}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
}

export default ShowErrors;
