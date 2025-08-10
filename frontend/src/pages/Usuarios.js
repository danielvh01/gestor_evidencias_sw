import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom"; 
import { getUsuarios, updateUsuario } from "../services/usuarioService";
import UsuariosTable from "../components/UsuariosTable";
import UsuarioForm from "../components/UsuarioForm";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  }

  const toggleActivo = async (id) => {
    const usuario = usuarios.find((u) => u.usr_id === id);
    if (!usuario) return;

    const updated = { ...usuario, usr_activo: usuario.usr_activo ? 0 : 1 };
    setSaving(true);
    try {
      await updateUsuario(updated);
      await fetchUsuarios();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    } finally {
      setSaving(false);
    }
  };

  const editarUsuario = (id) => {
    const usuario = usuarios.find((u) => u.usr_id === id);
    setEditingUsuario(usuario);
  };

  const handleSave = async (usuarioActualizado) => {
    setSaving(true);
    try {
      await updateUsuario(usuarioActualizado);
      setEditingUsuario(null);
      await fetchUsuarios();
    } catch (error) {
      console.error("Error guardando usuario:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (

    <div>
      <h1>Gestión de Usuarios</h1>
      <div className="mb-3 d-flex justify-content-right btn-sm gap-2 flex-wrap">
      <Link to="/CrearUsuario" className="btn btn-secondary">
            Crear usuario nuevo
      </Link>

      </div>
      <UsuariosTable
        usuarios={usuarios}
        onEditar={editarUsuario}
        onToggleActivo={toggleActivo}
      />

      {editingUsuario && (
        <UsuarioForm
          usuario={editingUsuario}
          onClose={() => setEditingUsuario(null)}
          onSave={handleSave}
        />
      )}

      {saving && <p>Guardando cambios...</p>}
    </div>
  );
}

export default Usuarios;
