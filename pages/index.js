import React from 'react';
import ideasData from '../data/ideas.json';

function HomePage({ dailyIdea }) {
  const descriptionWithLineBreaks = dailyIdea.description.replace(/\n/g, '<br />');

  return (
    
    <div className="min-vh-100 d-flex flex-column justify-content-start align-items-center bg-light">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <h1 className="display-4 text-primary">Daily Spark</h1>
            </div>
            <div className="text-center mt-4">
              <h2 className="mb-3 text-black">{dailyIdea.title}</h2>
              <p className="mt-3 text-muted">
                Estimated Reading Time: {dailyIdea.readingTime} minute{dailyIdea.readingTime !== 1 && 's'}
              </p>
              <p
                className="justified-text first-letter-big text-black"
                dangerouslySetInnerHTML={{ __html: descriptionWithLineBreaks }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <h3 className="text-primary">Subscribe to Our Newsletter</h3>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  aria-describedby="subscribe-button"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" id="subscribe-button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-auto p-3 text-center text-black">
        <p>&copy; {new Date().getFullYear()} Crywolf. All rights reserved.</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // Calculate the index of the idea to display based on the date
  const today = new Date();
  const ideaIndex = today.getDate() % ideasData.length;

  const dailyIdea = ideasData[ideaIndex];

  // Calculate the word count in the description
  const wordCount = dailyIdea.description.split(' ').length;

  // Define an average reading speed (words per minute)
  const averageReadingSpeed = 200; // You can adjust this value as needed

  // Calculate the estimated reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeed);

  return {
    props: {
      dailyIdea: {
        ...dailyIdea,
        readingTime: readingTimeMinutes,
      },
    },
  };
}
export default HomePage;
