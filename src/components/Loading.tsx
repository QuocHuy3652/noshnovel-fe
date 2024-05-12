import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { HashLoader } from 'react-spinners';

const Loading = ({ bgColor = 'rgba(0, 0, 0, 0.4)' }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        backgroundColor: bgColor,
        position: 'fixed',
      }}
      style={{
        zIndex: 9999,
      }}
      open={true}
    >
      <HashLoader color="#D1F4BC" size={100} speedMultiplier={2} />
    </Backdrop>
  );
};

export default Loading;
