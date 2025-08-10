import React from "react";

function UsuariosTable({ usuarios, onEditar, onToggleActivo }) {
  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Completo</th>
          <th>Rol ID</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usr) => (
          <tr
            key={usr.usr_id}
            style={{ backgroundColor: usr.usr_activo ? "white" : "#f8d7da" }}
          >
            <td>{usr.usr_id}</td>
            <td>{usr.usr_nombre_completo}</td>
            <td>{usr.usr_rol_id}</td>
            <td>{usr.usr_activo ? "Sí" : "No"}</td>
            <td>
              <button onClick={() => onEditar(usr.usr_id)} style={{ marginRight: 8 }}>
                Editar
              </button>
              <button onClick={() => onToggleActivo(usr.usr_id)}>
                {usr.usr_activo ? "Desactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsuariosTable;
