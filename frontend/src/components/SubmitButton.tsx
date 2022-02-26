import React from 'react';

type Props = {
  text: string;
};

const SubmitButton: React.FC<Props> = ({ text }) => {
  return (
    <button
      className="w-full mt-4  py-1 bg-black font-lato font-semibold text-base text-white capitalize rounded-md hover:bg-gray-800"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
