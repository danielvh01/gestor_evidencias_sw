import React from "react";

function UsuariosTable({ usuarios, onEditar, onToggleActivo }) {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
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
            className={usr.usr_activo ? "" : "table-danger"}
          >
            <td>{usr.usr_id}</td>
            <td>{usr.usr_nombre_completo}</td>
            <td>{usr.usr_rol_id}</td>
            <td>{usr.usr_activo ? "Sí" : "No"}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEditar(usr.usr_id)}
              >
                Editar
              </button>
              <button
                className={`btn btn-sm ${usr.usr_activo ? "btn-danger" : "btn-success"}`}
                onClick={() => onToggleActivo(usr.usr_id)}
              >
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
