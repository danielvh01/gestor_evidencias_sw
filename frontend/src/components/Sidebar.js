import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import mplogo from '../assets/MP_logo.png';

const Sidebar = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`d-flex flex-column bg-light border-end vh-100 position-fixed ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
      
      style={{ width: collapsed ? "70px" : "200px", transition: "width 0.3s" }}
    >
    <div style={{ textAlign: "center", marginBottom: 10 }}>
    <img
        src={mplogo}
        alt="Logo"
        style={{ width: 32, height: 32, display: "inline-block" }}
    />
    </div>
      <button
        className="btn btn-outline-primary m-3"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
      >
        {collapsed ? "☰" : "←"}
      </button>

      {!collapsed && (
        <>
          <div className="px-3 mb-3">
            <strong>Usuario:</strong> {localStorage.getItem("usuario") || "Invitado"}
          </div>
          <div className="px-3 mb-3">
            <strong>Rol:</strong> -
          </div>

          <nav className="flex-grow-1 px-2">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-2">
                <NavLink
                  to="/expedientes"
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "active" : "")
                  }
                >
                  Expedientes
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/usuarios"
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "active" : "")
                  }
                >
                  Usuarios
                </NavLink>
              </li>
            </ul>
          </nav>
          <button
            className="btn btn-danger m-3 mt-auto"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
