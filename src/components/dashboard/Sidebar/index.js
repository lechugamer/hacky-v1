import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { IconContext } from "react-icons";
import logo from "../../../assets/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const [inactive, setInactive] = useState(false);

  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className={`sidebar ${inactive ? "inactive" : ""}`}>
        <div className="sidebar__logo">
          <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h3>Hacky</h3>
          </div>
        <div onClick={() => setInactive(!inactive)} className="arrow__close">
          <i>
            <FaChevronLeft />
          </i>
        </div>
        </div>
        <Link to="/dashboard" className="sidebar__link">
          <i className="menu__icons">
            <FaHome />
          </i>
          <h3>Tablero</h3>
        </Link>
        <Link to="/users" className="sidebar__link">
          <i className="menu__icons">
            <FaUsers />
          </i>
          <h3>Usuarios</h3>
        </Link>
        <Link to="/entries" className="sidebar__link">
          <i className="menu__icons">
            <IoDocumentText />
          </i>
          <h3>Entradas</h3>
        </Link>
        <Link to="/tags" className="sidebar__link">
          <i className="menu__icons">
            <FaUsers />
          </i>
          <h3>Etiquetas</h3>
        </Link>
        <Link className="sidebar__link">
          <i className="menu__icons">
            <FaUsers />
          </i>
          <h3>Vacio</h3>
        </Link>
        <Link className="sidebar__link">
          <i className="menu__icons">
            <FaUsers />
          </i>
          <h3>Vacio</h3>
        </Link>
        <Link className="sidebar__logout">
          <i className="logout__icon">
            <FaUsers />
          </i>
          <h3>Cerrar Sesión</h3>
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
