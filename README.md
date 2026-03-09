# prueba-almotores-dev-diazcc

## Descripción

Sistema de autenticación con JWT completo implementado con:
- **Backend:** FastAPI (Python) con validación de credenciales en archivo `.txt`
- **Frontend:** Vue 3 (TypeScript) con Atomic Design y BEM
- **Autenticación:** JWT tokens guardados en localStorage
- **Base de Datos:** Archivo CSV simple (`users.txt`)

## 🚀 Inicio Rápido

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**API disponible en:** `http://127.0.0.1:8000`
**Documentación interactiva:** `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**Aplicación disponible en:** `http://localhost:5173`

## 📋 Credenciales de Prueba

| Email | Contraseña |
|-------|-----------|
| demo@test.com | Demo123 |
| test@test.com | test123 |

## 📚 Documentación Completa

Para información detallada sobre:
- Arquitectura del proyecto
- Estructura de carpetas
- Patrones de diseño (Atomic Design, BEM)
- Endpoints de API
- Decisiones técnicas
- Testing manual
- Consideraciones de seguridad

👉 **Ver [DOCUMENTACION.md](./DOCUMENTACION.md)**

## ✨ Características Principales

✅ Login con validación de credenciales  
✅ Generación de JWT  
✅ Dashboard protegido con tabla de usuarios  
✅ Guards de ruta automáticos  
✅ Diseño responsivo con Atomic Design  
✅ CORS configurado para desarrollo local  
✅ TypeScript para type safety  

## 🏗️ Estructura del Proyecto

```
.
├── backend/
│   ├── main.py          # API FastAPI
│   ├── users.txt        # Base de datos CSV
│   └── requirements.txt  # Dependencias Python
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Atomic Design (atoms, molecules, organisms)
│   │   ├── services/    # API client
│   │   ├── router.ts    # Rutas y guards
│   │   └── store/       # Estado global
│   └── package.json
│
├── README.md            # Este archivo
└── DOCUMENTACION.md     # Documentación completa
```

## 💾 Build para Producción

**Backend:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
npm run build
npm run preview
```

## 📝 Notas

- Las contraseñas están en texto plano por simplicidad (usar bcrypt en producción)
- El archivo `.txt` es funcional pero no escalable (usar BD en producción)
- CORS está abierto a localhost para desarrollo (restringir en producción)
- Secret key de JWT está hardcodeada (usar variables de entorno en producción)

## 🔐 Seguridad

Este es un ejercicio técnico educativo. Para producción, implementar:
- Bcrypt para contraseñas
- Variables de entorno para secrets
- Base de datos real
- HTTPS
- Rate limiting
- CSRF protection

---

## 👨‍💻 Autor

**Andres Felipe Diaz Castillo**  
📧 [diazccx@gmail.com](mailto:diazccx@gmail.com)

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026
