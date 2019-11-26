import React from 'react';

const ContentCard = (props) => {
  return (
    <div id="content_card">

    <blockquote>
    <h1 className="quotation">we do not learn from experience ... we learn from reflecting on experience.
    </h1>
    <p id="quote-author">John Dewey</p>
    </blockquote>

    </div>
  )
}

export default ContentCard;

//TO DO: Create multiple cards of information to display on About Page (like benefits of reflection, the backstory of the application, etc.)
// <h2>{props.title}</h2>
// <p>{props.content}</p>
