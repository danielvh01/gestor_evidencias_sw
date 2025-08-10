
CREATE PROCEDURE sp_crud_auth
  @op CHAR(1),               -- I=Insert, U=Update, D=Delete, S=Select (por Id), L=Listar todos
  @au_id INT = NULL,
  @au_usuario VARCHAR(20) = NULL,
  @au_password VARCHAR(250) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @op = 'I'
  BEGIN
    -- Insertar nuevo auth
    INSERT INTO dcri_auth (au_id, au_usuario, au_password)
    VALUES (@au_id, @au_usuario, @au_password);

    SELECT SCOPE_IDENTITY() AS nuevo_au_id;
    RETURN;
  END

  IF @op = 'U'
  BEGIN
    -- Actualizar auth existente
    UPDATE dcri_auth
    SET
      au_usuario = @au_usuario,
      au_password = @au_password
    WHERE au_id = @au_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'D'
  BEGIN
    -- Eliminar auth por Id
    DELETE FROM dcri_auth
    WHERE au_id = @au_id;

    SELECT @@ROWCOUNT AS filas_afectadas;
    RETURN;
  END

  IF @op = 'S'
  BEGIN
    -- Obtener auth por Id
    SELECT au_id, au_usuario, au_password
    FROM dcri_auth
    WHERE au_id = @au_id;
    RETURN;
  END

  IF @op = 'L'
  BEGIN
    -- Listar todos los auths
    SELECT au_id, au_usuario, au_password
    FROM dcri_auth
    ORDER BY au_usuario;
    RETURN;
  END

  -- Si @op no coincide con nada
  RAISERROR('Operación inválida. Use I, U, D, S o L.', 16, 1);
END;
GO
