// Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ClipLoader size={30} color={"#123abc"} loading={true} />
  </div>
);

export default Spinner;
