
CREATE PROCEDURE sp_crud_expediente
  @op CHAR(1),                      -- I=Insert, U=Update, D=Delete, S=Select (por Id), L=Listar todos
  @exp_id INT = NULL,
  @exp_fecha_registro DATETIME = NULL, -- Opcional para update, insert usa GETDATE() por defecto
  @exp_tecnico_id INT = NULL,
  @exp_estado VARCHAR(20) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    -- Insertar nuevo expediente (fecha se pone automáticamente con GETDATE())
    INSERT INTO dcri_expediente (exp_tecnico_id, exp_estado)
    VALUES (@exp_tecnico_id, @exp_estado);

    SELECT SCOPE_IDENTITY() AS nuevo_exp_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    -- Actualizar expediente existente
    UPDATE dcri_expediente
    SET
      exp_tecnico_id = @exp_tecnico_id,
      exp_estado = @exp_estado
    WHERE exp_id = @exp_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    -- Eliminar expediente por Id
    DELETE FROM dcri_expediente
    WHERE exp_id = @exp_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    -- Obtener expediente por Id
    SELECT exp_id, exp_fecha_registro, exp_tecnico_id, exp_estado
    FROM dcri_expediente
    WHERE exp_id = @exp_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    -- Listar todos los expedientes
    SELECT exp_id, exp_fecha_registro, exp_tecnico_id, exp_estado
    FROM dcri_expediente
    ORDER BY exp_fecha_registro DESC;
    RETURN;
  END

  -- Si @op no coincide con nada
  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
