import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="max-w-full max-h-full flex items-center justify-center">
      <img src="./spinner.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;
