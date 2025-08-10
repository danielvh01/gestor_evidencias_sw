CREATE PROCEDURE sp_crud_evidencia
  @op CHAR(1),                     -- I=Insert, U=Update, D=Delete, S=Select por Id, L=Listar todos
  @evi_id INT = NULL,
  @evi_expediente_id INT = NULL,
  @evi_descripcion VARCHAR(500) = NULL,
  @evi_color VARCHAR(50) = NULL,
  @evi_tamano VARCHAR(50) = NULL,
  @evi_peso DECIMAL(10, 2) = NULL,
  @evi_ubicacion VARCHAR(100) = NULL,
  @evi_tecnico_id INT = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    INSERT INTO dcri_evidencia (
      evi_expediente_id,
      evi_descripcion,
      evi_color,
      evi_tamano,
      evi_peso,
      evi_ubicacion,
      evi_tecnico_id
    )
    VALUES (
      @evi_expediente_id,
      @evi_descripcion,
      @evi_color,
      @evi_tamano,
      @evi_peso,
      @evi_ubicacion,
      @evi_tecnico_id
    );

    SELECT SCOPE_IDENTITY() AS nuevo_evi_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    UPDATE dcri_evidencia
    SET
      evi_expediente_id = @evi_expediente_id,
      evi_descripcion = @evi_descripcion,
      evi_color = @evi_color,
      evi_tamano = @evi_tamano,
      evi_peso = @evi_peso,
      evi_ubicacion = @evi_ubicacion,
      evi_tecnico_id = @evi_tecnico_id
    WHERE evi_id = @evi_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    DELETE FROM dcri_evidencia
    WHERE evi_id = @evi_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    SELECT
      evi_id,
      evi_expediente_id,
      evi_descripcion,
      evi_color,
      evi_tamano,
      evi_peso,
      evi_ubicacion,
      evi_tecnico_id
    FROM dcri_evidencia
    WHERE evi_id = @evi_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    SELECT
      evi_id,
      evi_expediente_id,
      evi_descripcion,
      evi_color,
      evi_tamano,
      evi_peso,
      evi_ubicacion,
      evi_tecnico_id
    FROM dcri_evidencia
    ORDER BY evi_id;
    RETURN;
  END

  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
