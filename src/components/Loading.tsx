import * as React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = ({ fullScreen = true, isBlur = true }) => {
  const loader = <HashLoader color="#D1F4BC" size={100} speedMultiplier={2} />;

  if (fullScreen) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isBlur ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
          zIndex: 5,
        }}
      >
        {loader}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      {loader}
    </div>
  );
};

export default Loading;
