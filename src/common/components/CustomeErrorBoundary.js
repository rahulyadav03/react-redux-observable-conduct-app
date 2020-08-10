import React from "react";
import history from "../utils/history";

function CustomeErrorBoundary() {
  /**
   * Navigates to previous route
   */
  function goBack() {
    history.goBack();
  }
  return (
    <div className="text-center mt-5">
      <p>
        Oops, there is some problem in this page, please visit after some time
      </p>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-lg btn-outline-primary" onClick={goBack}>
          Go Back to working page
        </button>
      </div>
    </div>
  );
}

export default CustomeErrorBoundary;
