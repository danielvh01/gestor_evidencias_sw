-- Crear base de datos
CREATE DATABASE forense_app;
GO

USE forense_app;
GO

-- Tabla de roles
CREATE TABLE dcri_rol (
    rol_id INT PRIMARY KEY IDENTITY(1,1),
    rol_nombre VARCHAR(50) NOT NULL UNIQUE
);
-- Tabla de usuarios
CREATE TABLE dcri_usuario (
    usr_id INT PRIMARY KEY IDENTITY(1,1),
    usr_nombre_completo VARCHAR(100) NOT NULL,
    usr_rol_id INT NOT NULL,
    usr_activo INT NOT NULL
    FOREIGN KEY (usr_rol_id) REFERENCES dcri_rol(rol_id)
);

--Tabla de autorizacion
CREATE TABLE dcri_auth (
    au_id int NOT NULL PRIMARY KEY,
    au_usuario varchar(20) NOT NULL,
    au_password varchar(250) NOT NULL,
    FOREIGN KEY (au_id) REFERENCES dcri_usuario(usr_id)
);


-- Tabla de expedientes
CREATE TABLE dcri_expediente (
    exp_id INT PRIMARY KEY IDENTITY(1,1),
    exp_fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    exp_tecnico_id INT NOT NULL,
    exp_estado VARCHAR(20) NOT NULL,
    FOREIGN KEY (exp_tecnico_id) REFERENCES dcri_usuario(usr_id)
);

-- Tabla de evidencias
CREATE TABLE dcri_evidencia (
    evi_id INT PRIMARY KEY IDENTITY(1,1),
    evi_expediente_id INT NOT NULL,
    evi_descripcion VARCHAR(500),
    evi_color VARCHAR(50),
    evi_tamano VARCHAR(50),
    evi_peso DECIMAL(10,2),
    evi_ubicacion VARCHAR(100),
    evi_tecnico_id INT NOT NULL,
    FOREIGN KEY (evi_expediente_id) REFERENCES dcri_expediente(exp_id),
    FOREIGN KEY (evi_tecnico_id) REFERENCES dcri_usuario(usr_id)
);

-- Tabla de revisiones
CREATE TABLE dcri_revision (
    rev_id INT PRIMARY KEY IDENTITY(1,1),
    rev_expediente_id INT NOT NULL,
    rev_coordinador_id INT NOT NULL,
    rev_fecha DATETIME NOT NULL DEFAULT GETDATE(),
    rev_estado VARCHAR(20) NOT NULL,
    FOREIGN KEY (rev_expediente_id) REFERENCES dcri_expediente(exp_id),
    FOREIGN KEY (rev_coordinador_id) REFERENCES dcri_usuario(usr_id)
);

-- Tabla de justificaciones de rechazo
CREATE TABLE dcri_justificacion_rechazo (
    jr_id INT PRIMARY KEY IDENTITY(1,1),
    jr_revision_id INT NOT NULL,
    jr_justificacion VARCHAR(500) NOT NULL,
    FOREIGN KEY (jr_revision_id) REFERENCES dcri_revision(rev_id)
);

-- =====================
-- Insertar datos dummy
-- =====================

-- Roles
INSERT INTO dcri_rol (rol_nombre)
VALUES ('tecnico'), ('coordinador');

-- Usuarios
INSERT INTO dcri_usuario (usr_nombre_completo, usr_rol_id, usr_activo)
VALUES 
('usuario1', 1, 1),
('usuario2', 1, 1),
('usuario3', 2, 1);

-- Expedientes
INSERT INTO dcri_expediente (exp_fecha_registro, exp_tecnico_id, exp_estado)
VALUES 
(GETDATE(), 1, 'Pendiente'),
(GETDATE(), 2, 'Pendiente');

-- Evidencias
INSERT INTO dcri_evidencia (
    evi_expediente_id, evi_descripcion, evi_color, evi_tamano, evi_peso, evi_ubicacion, evi_tecnico_id
)
VALUES
(1, 'Fragmento de material recolectado', 'Marrón', 'Mediano', 12.50, 'Almacén 1 - Caja 3', 1),
(1, 'Muestra orgánica en soporte', 'Rojo oscuro', 'Pequeño', 5.20, 'Estante A4', 1),
(2, 'Elemento sintético adherido', 'Transparente', 'Grande', 45.30, 'Zona refrigerada', 2);

-- Revisiones
INSERT INTO dcri_revision (rev_expediente_id, rev_coordinador_id, rev_fecha, rev_estado)
VALUES 
(1, 3, GETDATE(), 'Rechazado'),
(2, 3, GETDATE(), 'Aprobado');

-- Justificaciones de rechazo
INSERT INTO dcri_justificacion_rechazo (jr_revision_id, jr_justificacion)
VALUES
(1, 'Información incompleta en los datos de recolección');

-- Crear usuario de aplicación
CREATE LOGIN forense_app_user WITH PASSWORD = '73>ysO72eQL0';
GO

-- Asociarlo a la base de datos
USE forense_app;
GO
CREATE USER forense_user FOR LOGIN forense_app_user;
GO

-- Dar permisos de lectura y escritura
ALTER ROLE db_datareader ADD MEMBER forense_user;
ALTER ROLE db_datawriter ADD MEMBER forense_user;
GO

-- Opcional: permitir ejecución de SPs si los usas
GRANT EXECUTE TO forense_user;
GO

