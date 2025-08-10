import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

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

  const activeStyle = {
    fontWeight: "bold",
    color: "blue",
  };

  return (
    <aside
      style={{
        width: collapsed ? "60px" : "200px",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s",
        overflowX: "hidden",
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{ marginBottom: "20px", width: "100%" }}
        aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
      >
        {collapsed ? "☰" : "←"}
      </button>

      {!collapsed && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <strong>Usuario:</strong> {localStorage.getItem("usuario") || "Invitado"}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>Rol:</strong> {localStorage.getItem("rol")}
          </div>

          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <NavLink
                  to="/expedientes"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Expedientes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usuarios"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Usuarios
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            onClick={handleLogout}
            style={{  marginTop: "20px", width: "100%" }}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
