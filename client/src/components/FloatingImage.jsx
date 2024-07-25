// This is for the image on the homepage that gives an animation of floating over the index

import React from 'react';
import './FloatingImage.css';
import Image from "../assets/Images/blog-2-transformed.jpeg"

const FloatingImage = ({ src, alt }) => {
  return <img src={Image} alt={alt} className="float-effect" />;
};

export default FloatingImage;
