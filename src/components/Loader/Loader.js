import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-custom-orange animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-custom-orange animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-custom-orange animate-bounce [animation-delay:-0.5s]"></div>
    </div>
  );
};

export default Loader;
