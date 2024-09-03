import React from 'react';

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`absolute z-10 w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full cursor-pointer ${direction === 'next' ? 'right-2 top-2' : 'left-2 top-2'} ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <div className={`arrow-${direction}`} />
    </div>
  );
};

export const NextArrow = (props) => <CustomArrow {...props} direction="next" />;
export const PrevArrow = (props) => <CustomArrow {...props} direction="prev" />;
