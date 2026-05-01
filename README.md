# Mi Inventario Express - Actividad 2 🚀

Este proyecto es una aplicación web desarrollada para la asignatura de **Aplicaciones Web** en la **Universidad Politécnica Salesiana**. El objetivo es gestionar un inventario de productos con persistencia en base de datos y funcionalidades en tiempo real.

## Datos del Estudiante
* **Nombre:** Christian Taipe
* **Carrera:** Ingeniería en Software
* **Semestre:** Cuarto Semestre
* **Institución:** Universidad Politécnica Salesiana (UPS)

## Funcionalidades Implementadas

1.  **Arquitectura MVC:** Estructura organizada en carpetas de modelos, rutas, controladores y vistas para un código escalable.
2.  **Persistencia de Datos:** Conexión configurada a MongoDB con soporte para entornos de desarrollo con restricciones de red.
3.  **Gestión de Productos (CRUD):** * Creación de productos con persistencia en base de datos.
    * Listado dinámico de inventario en la página principal con Handlebars.
    * Integración de botones de acción (Editar/Eliminar) vinculados al ID de cada documento.
4.  **Carga de Imágenes (Multer):** * Validación de tipos de archivos (JPEG, JPG, PNG, GIF).
    * Límite de tamaño de archivo (2MB por imagen).
    * Almacenamiento físico en el servidor dentro de `public/uploads`.
5.  **Motor de Plantillas:** Implementación de **Handlebars** con un layout principal (`main.handlebars`) para mantener la consistencia visual.

## Tecnologías Utilizadas
* **Node.js & Express:** Servidor y ruteo.
* **Mongoose:** Modelado de datos y conexión a MongoDB.
* **Multer:** Gestión de archivos `multipart/form-data`.
* **Handlebars (HBS):** Renderizado dinámico del lado del servidor.
* **Dotenv:** Gestión segura de variables de entorno.

## Instrucciones de Uso

### Requisitos previos
* Tener instalado [Node.js](https://nodejs.org/).
* Tener una instancia de **MongoDB** activa en `localhost:27017`.

### Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias (Express, Mongoose, Multer, Handlebars, etc.).
3. Configurar el archivo `.env` en la raíz:
   ```env
   PUERTO=3000
   URL_DB=mongodb://127.0.0.1:27017/MiInventarioExpress

### Actualización 30/04
**Actualización de Funcionalidades**
  Seguridad y Autenticación
1. Registro de usuarios: Almacenamiento seguro en base de datos local.
2. Validación de credenciales: Sistema de inicio de sesión funcional.
3. Gestión de sesiones: Uso de express-session para proteger el acceso al inventario.
4. Encriptación: Uso de bcryptjs para el hashing de contraseñas.

**Nuevas Tecnologías**

1. Bcryptjs: Implementación de seguridad para proteger los datos sensibles del usuario.
2. Express-session: Control de persistencia de login y manejo de cookies de sesión.

### Actualización Final - 01/05
**Cierre de Proyecto y Funcionalidades Avanzadas**
  Seguridad y Autenticación:
1. Registro e Inicio de Sesión: Implementación de flujo completo de usuarios con almacenamiento en MongoDB.
2. Gestión de Sesiones: Uso de express-session para proteger rutas privadas; solo usuarios autenticados pueden gestionar el inventario.
3. Hashing de Claves: Encriptación de contraseñas mediante bcryptjs para máxima seguridad de datos.

  CRUD de Productos Optimizado:
1. Edición y Actualización: Interfaz para modificar datos existentes y actualización dinámica en la base de datos.
2. Eliminación Segura: Funcionalidad para remover productos del inventario vinculados por ID.
3. Validación de Entradas: Control estricto en el backend para evitar precios negativos o campos vacíos, asegurando la integridad de la base de datos.

  Comunicación en Tiempo Real (Socket.io):
1. Notificaciones Instantáneas: Integración de WebSockets para alertar a todos los clientes conectados cuando se añade un nuevo producto al inventario, cumpliendo con el requisito de interactividad.

**Nuevas Tecnologías Incorporadas**
1. Socket.io: Protocolo de comunicación bidireccional basada en eventos.
2. Bcryptjs: Librería de hashing para seguridad de contraseñas.
3. Express-session: Middleware para manejo de sesiones de usuario.

### Instrucciones de Uso (Cierre)
- Instalación: Ejecutar npm install para descargar las nuevas librerías (socket.io, bcryptjs, express-session).
- Variables de Entorno: Asegurarse de que el archivo .env contenga la cadena de conexión local a MongoDB.
- Ejecución: Iniciar el servidor con node app.js. El sistema notificará vía consola la conexión exitosa tanto a la base de datos como al servidor de Sockets.

### Nota de Desarrollo
- Infraestructura: El servidor se ejecuta en localhost debido a restricciones de red (DNS/Firewall) que impiden la conexión estable con MongoDB Atlas. Se optó por persistencia local para asegurar el cumplimiento de la entrega.
- Control de Acceso: Se ha implementado la lógica de autenticación completa. Las rutas de gestión de productos ahora requieren una sesión activa para garantizar que solo usuarios registrados puedan modificar el inventario.

### URL del repositorio GITHUB
- https://github.com/Chrstqn/Actividad2_Taipe_C.git