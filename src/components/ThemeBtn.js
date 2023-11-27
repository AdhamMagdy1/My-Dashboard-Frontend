import React from 'react';
import '../assets/styles/index.css';
import sun from '../assets/images/sun.svg';
import moon from '../assets/images/moon.svg';

function ThemeBtn() {
  //Function to toggle the theme
  function toggleTheme() {
    const circle = document.querySelector('.circle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');

    // Toggle the dark mode class on the body
    document.body.classList.toggle('dark-mode');

    // Toggle the circle and rectangle colors
    if (document.body.classList.contains('dark-mode')) {
      circle.style.left = '75px';
      document.documentElement.style.setProperty('--primary-color', '#fff');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#2C3036'
      );
      document.documentElement.style.setProperty('--thired-color', '#000');
      document.documentElement.style.setProperty(
        '--box-shadow',
        '-7px -7px 30px 0px #485057, 7px 7px 30px 0px #1F2427'
      );
      document.documentElement.style.setProperty(
        '--theme-btn-color',
        'linear-gradient(54deg, #FFC700 0%, #FFB803 100%)'
      );
      document.documentElement.style.setProperty(
        '--theme-btn-shadow',
        '5px 4px 6px 0px #EA9B3F inset'
      );
      document.documentElement.style.setProperty(
        '--theme-circle-color',
        'linear-gradient(221deg, #2C3036 0%, #212428 100%)'
      );
      document.documentElement.style.setProperty(
        '--theme-cirlce-shadow',
        '7px 7px 30px 0px #1F2427, -7px -7px 30px 0px #485057'
      );
      document.documentElement.style.setProperty(
        '--input-box-shadow',
        '-7px -7px 30px 0px #485057 inset, 7px 7px 30px 0px #1F2427 inset'
      );
    } else {
      circle.style.left = '35px';
      document.documentElement.style.setProperty('--primary-color', '#3c3c3c');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#e9edf0'
      );
      document.documentElement.style.setProperty('--thired-color', '#ffffff');
      document.documentElement.style.setProperty(
        '--box-shadow',
        '-12px -12px 20px 0px rgba(255, 255, 255, 0.8), 10px 10px 24px 0px rgba(166, 180, 200, 0.7)'
      );
      document.documentElement.style.setProperty(
        '--theme-btn-color',
        'linear-gradient(54deg, #5affff 0%, #50b5ff 100%)'
      );
      document.documentElement.style.setProperty(
        '--theme-btn-shadow',
        '5px 4px 6px 0px #3f6fea inset'
      );
      document.documentElement.style.setProperty(
        '--theme-circle-color',
        'linear-gradient(221deg, #eef0f5 0%, #e6e9ef 100%)'
      );
      document.documentElement.style.setProperty(
        '--theme-cirlce-shadow',
        '10px 10px 18px 0px rgba(166, 180, 200, 0.65), -10px -10px 18px 0px rgba(255, 255, 255, 0.8)'
      );
      document.documentElement.style.setProperty(
        '--input-box-shadow',
        '-5px -5px 15px 0px rgba(255, 255, 255, 0.75) inset,5px 5px 10px 0px rgba(166, 180, 200, 0.75) inset'
      );
    }

    // Toggle the icon visibility
    iconMoon.style.display =
      iconMoon.style.display === 'none' ? 'block' : 'none';
    iconSun.style.display =
      iconSun.style.display === 'block' ? 'none' : 'block';
  }

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      <div className="circle">
        <img
          className="icon"
          id="icon-moon"
          style={{ width: '24px', height: '24px' }}
          src={moon}
          alt="light theme"
        />
        <img className="icon" id="icon-sun" src={sun} alt="dark theme" />
      </div>
      <div className="rectangle"></div>
    </div>
  );
}

export default ThemeBtn;
