# Gestión de Evidencias - DICRI - danielvh01

Repositorio del sistema de gestión de expedientes y evidencias desarrollado para DICRI.

---

## 📦 Estructura del Proyecto

- ├── backend/ # API RESTful (Node.js + Express)
- ├── frontend/ # Interfaz de usuario (ReactJS)
- ├── mssqldb/ # Scripts de base de datos SQL Server
- ├── docker-compose.yml # Creacion de contenedores
- ├── Documentacion
- └── README.md



---

## 🚀 Despliegue Local con Docker

### 🔧 Requisitos Previos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Puertos 1433 (SQL Server), 4000 (API), y 8080 (React en NGINX) libres

---

### ⚙️ Paso 1: Clonar el repositorio

```bash
https://github.com/danielvh01/gestor_evidencias_sw/
cd gestor_evidencias_sw/
```

---

### 🐳 Paso 2: Levantar la infraestructura

```bash
docker compose up --build
```

Esto levantará los siguientes servicios:

| Servicio    | Puerto | Descripción                     |
| ----------- | ------ | ------------------------------- |
| SQL Server  | 1433   | Base de datos                   |
| API Backend | 4000   | API RESTful (NodeJS + Express)  |
| Frontend    | 8080   | Interfaz Web (ReactJS + Nginx ) |


---

### 🐳 Paso 3: Ejecución de scripts iniciales

```bash
docker exec -it mc-dicri-db bash 
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "7J((s&53qG7" -No -i /tmp/script_inicio.sql
```

---

### 📂 Directorios relevantes

/mssqldb/script_inicio.sql: Script con la creación de tablas y procedimientos almacenados.

/backend/: Código fuente del backend con controladores, rutas y lógica.

/frontend/: Código fuente del frontend con componentes, servicios y vistas.

---

### 🧪 Pruebas y Documentación
Postman: archivo DICRI.postman_collection.json con pruebas de los endpoints.

Swagger: archivo dicri-api-swagger.yaml con definicion de Endpoints.

---

### 👤 Credenciales por defecto

| Rol         | Usuario      | Contraseña |
| ----------- | ------------ | ---------- |
| Coordinador | gsantacruz   | 123        |
| Coordinador | dvelasquez   | 123        |

---

### 🛠 Tecnologías Utilizadas
- ReactJS + Nginx
- Node.js + Express
- SQL Server
- Docker + Docker Compose