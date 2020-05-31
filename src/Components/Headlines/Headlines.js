import React from 'react';

function Headlines(props) {
  return (
      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="headlines">
        {props.newsArticles.map((newsArticle, index) => (
          <p
            key={newsArticle.id}
          >
            {newsArticle.webTitle}
          </p>
        ))}
        </div>
      </foreignObject>
  );
}

export default Headlines;
