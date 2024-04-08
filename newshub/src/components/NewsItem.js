import React from "react";
import defaultImg from './main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq.jpeg';

const NewsItem = (props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card my-3">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            !imageUrl
              ? defaultImg
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 45) : ""}...</h5>
          <p className="card-text">
            {description ? description.slice(0, 88) : ""}...
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on{" "}
              {new Date(date).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short",
              })}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-dark btn-sm"
          >
            Read more
          </a>
        </div>
      </div>
    );
}

export default NewsItem;
