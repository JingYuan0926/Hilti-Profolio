import React from 'react';
import failImage from '../assets/fail.png'; // Import the fail image

const Fail = () => {
  return (
    <div>
      <img src={failImage} alt="Fail" /> {/* Render the fail image */}
    </div>
  );
};

export default Fail;
