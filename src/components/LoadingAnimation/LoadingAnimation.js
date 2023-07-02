import React from 'react';
import './LoadingAnimation.css';
import { Circles } from 'react-loader-spinner';

const LoadingAnimation = ({ animation, windowWidth }) => {
   const animationSize = () => {
   return windowWidth > 767 ? "180" : "80"
   }
    return (
        <div className={`loading-animation ${animation ? 'loading-animation_opened' : ''}`}>
          <Circles color="#2BE080" width={animationSize()} height={animationSize()} />
        </div>
    )
};

export default LoadingAnimation;
