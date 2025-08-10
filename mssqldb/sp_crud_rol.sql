

CREATE PROCEDURE sp_crud_rol
  @op CHAR(1),                 -- I=Insert, U=Update, D=Delete, S=Select (por Id), L=Listar todos
  @rol_id INT = NULL,
  @rol_nombre VARCHAR(50) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    -- Insertar nuevo rol
    INSERT INTO dcri_rol (rol_nombre)
    VALUES (@rol_nombre);

    SELECT SCOPE_IDENTITY() AS nuevo_rol_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    -- Actualizar rol existente
    UPDATE dcri_rol
    SET rol_nombre = @rol_nombre
    WHERE rol_id = @rol_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    -- Eliminar rol por Id
    DELETE FROM dcri_rol
    WHERE rol_id = @rol_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    -- Obtener rol por Id
    SELECT rol_id, rol_nombre
    FROM dcri_rol
    WHERE rol_id = @rol_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    -- Listar todos los roles
    SELECT rol_id, rol_nombre
    FROM dcri_rol
    ORDER BY rol_nombre;
    RETURN;
  END

  -- Si @op no coincide con nada
  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
