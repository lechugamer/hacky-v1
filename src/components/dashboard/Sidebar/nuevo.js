import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import {FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./Sidebar.css";
import logo from "../../../assets/logo.png";

const Sidebar = () => {

  const [inactive, setInactive] = useState(false);
  const history = useHistory();

  function logout () {
    localStorage.clear();
    history.push('/');
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
    <div className={`sidebar ${inactive ? 'inactive' : ''}`}>
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Hacky</h1>
        </div>
        <div className='arrow__close' onClick={() => setInactive(!inactive)}>
        <i>
          <FaChevronLeft />
        </i>
        </div>
      </div>

      <div className="sidebar__menu">
        <Link to="/dashboard" className="sidebar__link">
          <i className="fa fa-home"></i>
          <span>Tablero</span>
        </Link>
        <Link to="/users" className="sidebar__link">
          <i className="fa fa-users" aria-hidden="true"></i>
          <span>Usuarios</span>
        </Link>
        <Link to="/entries" className="sidebar__link">
            <i className="fa fa-file-text-o"></i>
            <span>Entradas</span>
        </Link>
        <Link to="/tags" className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <span>Etiquetas</span>
        </Link>
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <span>Vacío</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <span>Vacío</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <span>Vacío</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out"></i>
          <span>Vacío</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o"></i>
          <span>Vacío</span>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-files-o"></i>
          <span>Vacío</span>
        </div>
        <button className="sidebar__logout" onClick={logout}>
          <i className="fa fa-power-off"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
    </IconContext.Provider>
  );
};

export default Sidebar;