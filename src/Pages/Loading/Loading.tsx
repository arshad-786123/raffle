
import React from 'react';
import './Loading.css';
import loadingVideo from '../../assets/loadingVideo.mp4';

const Loading: React.FC = () => {
    return (
      <div className="loading-overlay">
        <video autoPlay loop muted className="loadingvideo" playsInline>
          <source src={loadingVideo} type="video/mp4" />
        </video>
      </div>
    );
};

export default Loading;

