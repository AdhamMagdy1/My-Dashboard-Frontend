import React from 'react';
import me from '../assets/images/me.png';
import '../assets/styles/index.css';
function Myimage() {
  return (
    <div className="img-holder">
      <div className="img">
        <img src={me} alt="Adham Magdy" />
      </div>
    </div>
  );
}

export default Myimage;
