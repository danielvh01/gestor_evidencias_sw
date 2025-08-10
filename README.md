# Gestión de Evidencias - DICRI

Repositorio del sistema de gestión de expedientes y evidencias desarrollado para DICRI.

---

## 📦 Estructura del Proyecto

- ├── backend/ # API RESTful (Node.js + Express)
- ├── frontend/ # Interfaz de usuario (ReactJS)
- ├── db/ # Scripts de base de datos SQL Server
- ├── docker-compose.yml # Orquestador de contenedores
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
git clone https://github.com/tu-usuario/nombre-repo.git
cd nombre-repo
```

---

### 🐳 Paso 2: Levantar la infraestructura

```bash
docker-compose up -d --build
```

Esto levantará los siguientes servicios:

| Servicio    | Puerto | Descripción                     |
| ----------- | ------ | ------------------------------- |
| SQL Server  | 1433   | Base de datos                   |
| API Backend | 3000   | API RESTful (ExpressJS)         |
| Frontend    | 5173   | Interfaz Web (ReactJS con Vite) |


---

### 🐳 Paso 3: Ejecución de scripts iniciales

```bash
docker cp \mssqldb\script_inicio.sql musing_meitner:/tmp/script_inicio.sql
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "7J((s&53qG7" -No -i /tmp/script_inicio.sql
```

---

### 📂 Directorios relevantes

/db/init.sql: Script con la creación de tablas y procedimientos almacenados.

/backend/: Código fuente del backend con controladores, rutas y lógica.

/frontend/: Código fuente del frontend con componentes, servicios y vistas.

---

### 🧪 Pruebas y Documentación
Postman: archivo postman_collection.json con pruebas de los endpoints.

Swagger disponible en: http://localhost:3000/api-docs (si configurado)

---

### 👤 Credenciales por defecto (modo desarrollo)

| Rol         | Usuario      | Contraseña |
| ----------- | ------------ | ---------- |
| Técnico     | tecnico1     | tecnico123 |
| Coordinador | coordinador1 | coord123   |

---

### 🛠 Tecnologías Utilizadas
- ReactJS + Vite
- Node.js + Express
- SQL Server
- Docker + Docker Compose