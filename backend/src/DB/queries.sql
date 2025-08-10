use forense_app

select * from dcri_auth

select * from dcri_expediente

UPDATE dcri_usuario SET [usr_activo] = 0 WHERE usr_id = 2

SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM
    INFORMATION_SCHEMA.COLUMNS
WHERE
    TABLE_NAME = 'dcri_expediente';



    select * from dcri_evidencia