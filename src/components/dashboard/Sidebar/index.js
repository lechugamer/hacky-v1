import { Link, useHistory } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {

  const history = useHistory();

  function logout () {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Chatbot</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <Link to="/dashboard" className="sidebar__link">
          <i className="fa fa-home"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/users" className="sidebar__link">
          <i className="fa fa-users" aria-hidden="true"></i>
          <span>Users</span>
        </Link>
        <Link to="/entries" className="sidebar__link">
            <i className="fa fa-file-text-o"></i>
            <span>Entries</span>
        </Link>
        <Link to="/tags" className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <span>Tags</span>
        </Link>
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <span>Dummy</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <span>Dummy</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <span>Dummy</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out"></i>
          <span>Dummy</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o"></i>
          <span>Dummy</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-files-o"></i>
          <span>Dummy</span>
        </div>
        <button className="sidebar__logout" onClick={logout}>
          <i className="fa fa-power-off"></i>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;