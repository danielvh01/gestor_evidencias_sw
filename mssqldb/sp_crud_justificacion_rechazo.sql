CREATE PROCEDURE sp_crud_justificacion_rechazo
  @op CHAR(1),                      -- I=Insert, U=Update, D=Delete, S=Select por Id, L=Listar todos
  @jr_id INT = NULL,
  @jr_revision_id INT = NULL,
  @jr_justificacion VARCHAR(500) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    INSERT INTO dcri_justificacion_rechazo (jr_revision_id, jr_justificacion)
    VALUES (@jr_revision_id, @jr_justificacion);

    SELECT SCOPE_IDENTITY() AS nuevo_jr_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    UPDATE dcri_justificacion_rechazo
    SET
      jr_revision_id = @jr_revision_id,
      jr_justificacion = @jr_justificacion
    WHERE jr_id = @jr_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    DELETE FROM dcri_justificacion_rechazo
    WHERE jr_id = @jr_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    SELECT jr_id, jr_revision_id, jr_justificacion
    FROM dcri_justificacion_rechazo
    WHERE jr_id = @jr_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    SELECT jr_id, jr_revision_id, jr_justificacion
    FROM dcri_justificacion_rechazo
    ORDER BY jr_id;
    RETURN;
  END

  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
