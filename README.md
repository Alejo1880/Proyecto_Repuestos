# API Repuestos de Autos

PI REST desarrollada con Node.js y Express para la gestión de repuestos de automóviles.

Desarrollada como proyecto académico aplicando arquitectura N-Tier, autenticación JWT y documentación con Swagger.

## Características

- Autenticación y autorización de usuarios mediante JSON Web Tokens (JWT).
- Roles diferenciados (`admin` y `vendedor`) con permisos distintos sobre el catálogo.
- Gestión de repuestos: alta, consulta y control de stock.
- Gestión de pedidos: creación, agregado de ítems con validación de stock, y cambio de estado.
- Descuento automático de stock al agregar ítems a un pedido.
- Documentación interactiva de la API con Swagger UI.
- Arquitectura en capas (N-Tier) que separa rutas, controladores y acceso a datos.

## Tecnologías

- **Node.js** (ES6 Modules)
- **Express** 
- **MongoDB** + **Mongoose** — base de datos y modelado de esquemas
- **JSON Web Token** — autenticación
- **bcryptjs** — hash de contraseñas
- **Swagger** — documentación de la API
- **Render** — hosting del deploy

## Arquitectura

El proyecto sigue el patrón **N-Tier**, separando responsabilidades en capas independientes:

```
Request → Routes → Middlewares → Controllers → Repositories → MongoDB
```

```
src/
├── config/          # Base de datos y configuración de Swagger
├── models/           # Esquemas de Mongoose (User, Repuesto, Pedido)
├── repositories/      # Única capa que accede a la base de datos
├── controllers/        # Lógica de entrada/salida de cada endpoint
├── middlewares/         # Autenticación y autorización (JWT)
├── routes/               # Definición de endpoints y documentación Swagger
├── utils/                  # Helpers de JWT y bcrypt
└── app.js                    # Punto de entrada de la aplicación
```



## Instalación

# Clonar el repositorio
git clone https://github.com/Alejo1880/Proyecto_Repuestos.git

# Instalar dependencias
npm install


```

## Variables de entorno

El proyecto usa un archivo `.env` en la raíz, que **no se sube al repositorio**. Como plantilla se incluye `.env.sample`:

```env
PORT=3000
DB_URI=mongodb+srv://morfeo1880_db_user:8ZSdZ0no5XyqbyUe@cluster0.8hraqu7.mongodb.net/?appName=Cluster0
JWT_SECRET=f3a8c9d2e1b7a4f6c8d3e9b1a2c4d6e8f1a3b5c7d9e2f4a6b8c1d3e5f7a9b2c4
JWT_EXPIRES_IN=1d
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde corre el servidor localmente |
| `DB_URI` | Cadena de conexión a MongoDB (Atlas o local) |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (ej. `1d`, `2h`) |
| `NODE_ENV` | Entorno de ejecución (`development` / `production`) |

> En producción (Render), estas variables se configuran directamente en el dashboard del servicio, no mediante el archivo `.env`.


El servidor queda disponible en `http://localhost:3000`.

## Documentación de la API

La API está documentada con Swagger. Una vez que el servidor está corriendo, accedé a:

```
http://localhost:3000/api-docs
```


## Modelos de datos

**Usuario**
```
nombre, email, password (hasheada), rol (admin | vendedor)
```

**Repuesto**
```
codigo, descripcion, marca, precio, stock
```

**Pedido**
```
clienteNombre, estado (pendiente | armado | entregado), usuario, items[]
```

Cada ítem dentro de un pedido guarda `repuesto`, `cantidad` y `precioUnitario`.

## Endpoints

### Auth

| Método | Ruta | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar un nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión y obtener token |

### Repuestos

| Método | Ruta | Descripción |
|---|---|---|---|
| GET | `/api/repuestos` | Listar todos los repuestos |
| GET | `/api/repuestos/:id` | Obtener un repuesto por ID |
| POST | `/api/repuestos` | Crear un nuevo repuesto |

### Pedidos

| Método | Ruta | Descripción |
|---|---|---|---|
| GET | `/api/pedidos` | Listar todos los pedidos |
| GET | `/api/pedidos/:id` | Obtener un pedido por ID |
| POST | `/api/pedidos` | Crear un nuevo pedido |
| POST | `/api/pedidos/:id/items` | Agregar un repuesto al pedido |
| PATCH | `/api/pedidos/:id/estado` | Cambiar el estado del pedido |


## Roles

|admin | vendedor |


## Deploy

El proyecto está desplegado en Render (https://proyecto-repuestos.onrender.com/api-docs)