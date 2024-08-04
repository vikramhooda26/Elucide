import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>An unexpected error has occurred.</p>
      <a href="/">Go back to the homepage</a>
    </div>
  );
};

export default ErrorPage;