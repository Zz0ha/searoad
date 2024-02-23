import React from "react";
import "styles/loading.scss";

function Loading() {
  return (
    <div className="loadingWrap">
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Loading;
