import React from 'react';
import '../../assets/styles/index.css';
function OpenMenu() {
  function openTheMenu() {
    document.querySelector('.sideMenu').classList.add('opend');
  }
  return (
    <button className="openMenu" onClick={openTheMenu}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 5H20M4 12H20M4 19H20"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

export default OpenMenu;
