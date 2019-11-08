import React from 'react';

const Landing = () => {
    return (
        <div id= "landing-container">
            <div id="landing-content">
              <div id="landing-nav">
              <h2 id="landing-title">incREADible</h2>
              <button>sign in</button>
              </div>

              <div id="landing-tagline">
              <blockquote>
              <h1 className="quotation">we do not learn from experience ... we learn from reflecting on experience.
              </h1>
              <p id="landing-quote-author">John Dewey</p>
              </blockquote>
              <button>Get Started</button>
              </div>

            </div>
        </div>
    )
}


export default Landing;
