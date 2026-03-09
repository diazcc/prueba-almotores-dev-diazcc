# prueba-almotores-dev-diazcc

## Descripción

Este proyecto consta de un backend desarrollado en Python con FastAPI y un frontend desarrollado en Vue.js con Vite. El backend proporciona una API para autenticación y gestión de usuarios, mientras que el frontend es una interfaz de usuario para interactuar con la aplicación.

## Instalación

### Backend

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

### Frontend

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

## Uso

### Backend

1. Desde el directorio `backend`, ejecuta el servidor:
   ```
   uvicorn main:app --reload
   ```

2. El servidor estará disponible en `http://127.0.0.1:8000`. Puedes acceder a la documentación de la API en `http://127.0.0.1:8000/docs`.

### Frontend

1. Desde el directorio `frontend`, inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

2. Abre tu navegador y ve a `http://localhost:5173` (o el puerto indicado en la consola).
