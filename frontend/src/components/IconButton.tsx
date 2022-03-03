import React from 'react';

type iconButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

const IconButton: React.FC<iconButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      className="flex items-center justify-between ml-2 text-sm font-semibold text-gray-900 capitalize font-lato hover:text-gray-700 focus:outline-none focus:shadow-outline"
    >
      {icon} {text}
    </button>
  );
};

export default IconButton;
