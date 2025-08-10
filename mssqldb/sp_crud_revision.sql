CREATE PROCEDURE sp_crud_revision
  @op CHAR(1),                     -- I=Insert, U=Update, D=Delete, S=Select por Id, L=Listar todos
  @rev_id INT = NULL,
  @rev_expediente_id INT = NULL,
  @rev_coordinador_id INT = NULL,
  @rev_fecha DATETIME = NULL,
  @rev_estado VARCHAR(20) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    -- Insertar nuevo registro (fecha se pone por defecto GETDATE())
    INSERT INTO dcri_revision (rev_expediente_id, rev_coordinador_id, rev_estado)
    VALUES (@rev_expediente_id, @rev_coordinador_id, @rev_estado);

    SELECT SCOPE_IDENTITY() AS nuevo_rev_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    -- Actualizar registro existente
    UPDATE dcri_revision
    SET
      rev_expediente_id = @rev_expediente_id,
      rev_coordinador_id = @rev_coordinador_id,
      rev_estado = @rev_estado
    WHERE rev_id = @rev_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    -- Eliminar registro por id
    DELETE FROM dcri_revision
    WHERE rev_id = @rev_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    -- Seleccionar por id
    SELECT rev_id, rev_expediente_id, rev_coordinador_id, rev_fecha, rev_estado
    FROM dcri_revision
    WHERE rev_id = @rev_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    -- Listar todos
    SELECT rev_id, rev_expediente_id, rev_coordinador_id, rev_fecha, rev_estado
    FROM dcri_revision
    ORDER BY rev_fecha DESC;
    RETURN;
  END

  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
