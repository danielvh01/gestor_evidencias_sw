import React, { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarioService";
import UsuariosTable from "../components/UsuariosTable";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuarios();
  }, []);

  const toggleActivo = (id) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usr) =>
        usr.usr_id === id ? { ...usr, usr_activo: usr.usr_activo ? 0 : 1 } : usr
      )
    );
    // Aquí podrías llamar a API para actualizar estado de usuario
  };

  const editarUsuario = (id) => {
    alert(`Aquí abres un modal o rediriges para editar usuario ${id}`);
    // Implementa formulario de edición o navegación a página de edición
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UsuariosTable
        usuarios={usuarios}
        onEditar={editarUsuario}
        onToggleActivo={toggleActivo}
      />
    </div>
  );
}

export default Usuarios;
