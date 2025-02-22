import PropTypes from 'prop-types';
import React from 'react';

const DecorationFlash = ({ figureBackground, pseudoElements }) => {
  return (
    <figure
      className={`relative before:absolute before:md:w-1/2 before:w-7/12 before:left-0 before:top-0 before:z-30 after:absolute after:h-3 after:w-full after:-top-3 mt-3 before:border-b-[20px] before:border-r-[20px] after:z-30 ${pseudoElements} after:right-0 ${figureBackground} before:border-r-transparent text-white h-10 pl-10 sm:pl-20 pr-10`}
    />
  );
};

DecorationFlash.propTypes = {
  figureBackground: PropTypes.string,
  pseudoElements: PropTypes.string,
};
export default DecorationFlash;
