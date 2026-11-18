# Harmony Studio

Aplicación full-stack para gestionar un estudio de Pilates. Permite a los usuarios ver clases, reservar turnos y administrar sus reservas, mientras que el administrador puede controlar clases, usuarios y reservas desde un panel.

## Qué incluye

- Registro e inicio de sesión de usuarios.
- Catálogo de clases con disponibilidad.
- Reservas y cancelaciones de turnos.
- Panel administrativo para gestionar clases, usuarios y reservas.
- API protegida con autenticación JWT, validaciones y seguridad básica.

## Requisitos

- Node.js 18 o superior.
- MongoDB en local o remoto.

## Instalación

### 1. Configurar el Backend

```bash
cd backend

cp .env.example .env

npm install

npm run seed

npm run dev
```

Verificar estado del backend en **http://localhost:5000/api/health**.

### 2. Configurar el Frontend

En otra terminal:

```bash
cd frontend

cp .env.example .env

npm install

npm start
```

El frontend queda disponible en **http://localhost:3000**.

---

## Credenciales de prueba

Después de ejecutar `npm run seed`:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | `admin@harmonystudio.com` | `Admin123!` |

El administrador tiene acceso al panel en `/admin`.
