import React from 'react';
import Rating from '@mui/material/Rating';

const MovieRating = ({ value }) => {
  return <Rating value={value} readOnly max={5} precision={0.5} />;
};

export default MovieRating;
