import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src="./spinner.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;
