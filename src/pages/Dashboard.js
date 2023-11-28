import React from 'react';
import '../assets/styles/index.css';
import Myimage from '../components/Myimage';
import ThemeBtn from '../components/ThemeBtn';
import AddProject from '../components/dashboardIconBtns/AddProject';
import Logout from '../components/Logout';
import CloseMenu from '../components/dashboardIconBtns/CloseMenu';
import MyProjects from '../components/MyProjects';
import OpenMenu from '../components/dashboardIconBtns/OpenMenu';

function Dashboard() {
  return (
    <div className="dashboard">
      <ThemeBtn />
      <div className="sideMenu">
        <CloseMenu />
        <Myimage />
        <button className="viewProjectBtn">Projects</button>
        <AddProject />
        <Logout />
      </div>
      <div className="main-content">
        <OpenMenu />
        <h1>My Projects</h1>
        <MyProjects />
      </div>
    </div>
  );
}

export default Dashboard;
