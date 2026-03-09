# Documentación del Proyecto - Ejercicio Técnico

## 📋 Descripción General

Este es un ejercicio técnico completo que implementa un sistema de autenticación simple con:
- **Backend**: API REST en Python (FastAPI) con validación de credenciales contra archivo `.txt`
- **Frontend**: Interfaz Vue 3 con autenticación JWT y tabla de usuarios
- **Autenticación**: Token JWT guardado en localStorage
- **Estructura de Código**: Atomic Design en frontend, FastAPI modular en backend

---

## 🎯 Requisitos Cumplidos

### ✅ Backend
- [x] Endpoint `POST /login` con validación de email/password
- [x] Lectura de archivo `users.txt` como base de datos simple
- [x] Generación de JWT como token de sesión
- [x] Endpoint `GET /me` protegido con autenticación
- [x] Endpoint `GET /users` para listar todos los usuarios
- [x] CORS configurado para el frontend en localhost:5173

### ✅ Frontend
- [x] Pantalla de login funcional
- [x] Validación de credenciales contra el backend
- [x] Token JWT guardado en localStorage
- [x] Redirección automática a dashboard si está autenticado
- [x] Dashboard con tabla de usuarios del backend
- [x] Guards de ruta para proteger vistas autenticadas
- [x] Opción de logout (limpiar token)

---

## 📁 Estructura del Proyecto

```
prueba-almotores-dev-diazcc/
├── backend/
│   ├── main.py                 # API principal con todos los endpoints
│   ├── users.txt              # Base de datos simple (CSV)
│   ├── requirements.txt        # Dependencias de Python
│   └── __pycache__/
│
├── frontend/
│   ├── src/
│   │   ├── main.ts            # Configuración principal de Vue
│   │   ├── App.vue            # Componente raíz
│   │   ├── router.ts          # Rutas y guards de autenticación
│   │   ├── style.scss         # Estilos globales
│   │   ├── firebaseConfig.ts  # Config de Firebase (no usado actualmente)
│   │   │
│   │   ├── components/        # Atomic Design Structure
│   │   │   ├── atoms/         # Componentes básicos (Input, Button, Text)
│   │   │   ├── molecules/     # Componentes compuestos (Card, Form)
│   │   │   ├── organisms/     # Componentes complejos (Table, Layout)
│   │   │   ├── pages/         # Páginas (Login, Dashboard)
│   │   │   └── templates/     # Templates reutilizables
│   │   │
│   │   ├── services/          # Servicios de API
│   │   │   └── UserServices.ts   # Llamadas al backend
│   │   │
│   │   ├── store/             # Estado global (Pinia)
│   │   │   └── index.ts       # Store principal
│   │   │
│   │   ├── guards/            # Guards de ruta
│   │   │   └── authGuard.guard.ts
│   │   │
│   │   └── locales/           # Internacionalización (i18n)
│   │
│   ├── package.json           # Dependencias de Node
│   ├── tsconfig.json          # Configuración de TypeScript
│   ├── vite.config.ts         # Configuración de Vite
│   └── public/                # Assets públicos
│
├── README.md                  # Instrucciones básicas
└── DOCUMENTACION.md           # Este archivo

```

---

## 🏗️ Arquitectura y Patrones

### Backend - FastAPI

**Características principales:**
- Minimalista y sin dependencias externas complejas
- CORS habilitado para desarrollo local
- JWT usando librería `python-jose`
- Lectura de archivo `.txt` con módulo `csv`

**Endpoints:**
```
POST /login
├─ Input: { email, password }
├─ Valida contra users.txt
├─ Output: { access_token: "JWT_TOKEN" }
└─ Error: 401 Unauthorized

GET /me
├─ Requiere: Authorization header con Bearer token
├─ Output: { id, name, email }
└─ Error: 401 Unauthorized

GET /users
├─ Requiere: Authorization header con Bearer token
├─ Output: { users: Array<{id, name, email}> }
└─ Error: 401 Unauthorized
```

### Frontend - Vue 3 + Atomic Design

**Patrones de Diseño:**

1. **Atomic Design** - Estructura de componentes por nivel de complejidad:
   - **Atoms**: `InputText.atom.vue`, `Button.atom.vue` (componentes únicos)
   - **Molecules**: `LoginForm.molecule.vue` (pequeñas composiciones)
   - **Organisms**: `TableCorrespondenceDashboard.organism.vue` (componentes grandes)
   - **Templates**: `Dashboard.template.vue` (layouts)
   - **Pages**: `Login.page.vue`, `Dashboard.page.vue` (vistas completas)

2. **BEM (Block Element Modifier)** - Namespacing en CSS:
   ```scss
   .table__row__cell--left-align { }
   // Block: table
   // Element: row__cell
   // Modifier: --left-align
   ```

3. **Autenticación con JWT**:
   - Token guardado en `localStorage` con clave `access_token`
   - Configurado en axios headers globalmente
   - Guards de ruta protegen vistas privadas
   - Redireccionamiento automático: login ↔ dashboard

**Flujo de Autenticación:**

```
1. Usuario ingresa credenciales en Login.page.vue
   ↓
2. UserServices.backendLogin() envía POST /login
   ↓
3. Backend valida y retorna token JWT
   ↓
4. Token guardado en localStorage + axios headers
   ↓
5. Router guard verifica token y redirige a /home/dashboard
   ↓
6. Dashboard.page.vue obtiene usuarios de GET /users
   ↓
7. Tabla muestra: ID | Name | Email
```

---

## 🚀 Cómo Ejecutar

### Backend (Python)

1. **Instalar dependencias:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configurar archivo de usuarios** (`users.txt`):
   ```
   id,name,email,password
   1,Demo User,demo@test.com,Demo123
   2,Test User,test@test.com,test123
   ```

3. **Ejecutar servidor:**
   ```bash
   uvicorn main:app --reload
   ```
   - El servidor está disponible en: `http://127.0.0.1:8000`
   - Documentación interactiva: `http://127.0.0.1:8000/docs`

### Frontend (Vue 3)

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   - La aplicación está disponible en: `http://localhost:5173`

3. **Build para producción:**
   ```bash
   npm run build
   ```

---

## 🔐 Validación de Login

### Proceso

1. **Lectura del archivo `users.txt`:**
   ```python
   def read_users():
       users = []
       with open(USERS_FILE, newline='') as f:
           reader = csv.DictReader(f)  # Lee como CSV
           for row in reader:
               users.append(row)
       return users
   ```

2. **Búsqueda y validación:**
   ```python
   def authenticate_user(email: str, password: str):
       users = read_users()
       for user in users:
           if user["email"] == email and user["password"] == password:
               return user  # Encontrado
       return None  # No encontrado
   ```

3. **Generación de JWT:**
   ```python
   token = jwt.encode(
       {"id": user["id"], "email": user["email"]},
       SECRET_KEY,
       algorithm="HS256"
   )
   return {"access_token": token}
   ```

### Credenciales de Prueba

| Email | Contraseña |
|-------|-----------|
| demo@test.com | Demo123 |
| test@test.com | test123 |

---

## 📁 Archivos Principales

### Backend

| Archivo | Descripción |
|---------|-----------|
| `backend/main.py` | API completa con todos los endpoints |
| `backend/users.txt` | Base de datos simple (formato CSV) |
| `backend/requirements.txt` | Dependencias: fastapi, uvicorn, python-jose |

### Frontend

| Archivo | Descripción |
|---------|-----------|
| `frontend/src/main.ts` | Inicialización de Vue + configuración de axios |
| `frontend/src/router.ts` | Rutas y guards de autenticación |
| `frontend/src/App.vue` | Componente raíz |
| `frontend/src/components/pages/login/Login.page.vue` | Página de login |
| `frontend/src/components/pages/dashboard/Dashboard.page.vue` | Página de dashboard |
| `frontend/src/services/UserServices.ts` | Servicio para llamadas al backend |
| `frontend/src/store/index.ts` | Estado global (Pinia) |

---

## 🛠️ Decisiones Técnicas

### 1. **JWT en lugar de Session Cookies**
- ✅ Mejor para APIs REST
- ✅ Funciona bien con SPAs
- ✅ Stateless en el backend
- ✅ Fácil de implementar y debuggear

### 2. **Archivo .txt como Base de Datos**
- ✅ Cumple con requisitos del ejercicio
- ✅ Simple y sin dependencias externas
- ✅ Fácil de modificar manualmente
- ⚠️ No escala en producción (usar PostgreSQL/MongoDB)

### 3. **Atomic Design en Frontend**
- ✅ Componentes reutilizables y testeable
- ✅ Escalable para proyectos grandes
- ✅ Fácil onboarding de nuevos desarrolladores
- ✅ Separación clara de responsabilidades

### 4. **BEM para Naming en CSS**
- ✅ Naming consistente y predecible
- ✅ Evita conflictos de clases
- ✅ Mejora mantenibilidad
- ✅ Fácil de debuggear en DevTools

### 5. **CORS para Desarrollo Local**
- ✅ Frontend y backend en puertos diferentes
- ✅ Permite desarrollo independiente
- ⚠️ En producción, usar proxy o mismo dominio

---

## 🔄 Flujo de la Aplicación

### Primer Acceso

```
http://localhost:5173
     ↓
Router verifica token (no existe)
     ↓
Redirige a /login
     ↓
Usuario ingresa credenciales
     ↓
POST /login → Backend valida
     ↓
Token guardado en localStorage
     ↓
Redirige a /home/dashboard
     ↓
Dashboard obtiene usuarios: GET /users
     ↓
Tabla mostrada con usuarios
```

### Accesos Subsecuentes

```
http://localhost:5173
     ↓
Router verifica token (existe)
     ↓
Axios configura header Authorization
     ↓
Redirige a /home/dashboard
     ↓
Dashboard se carga automáticamente
```

### Logout

```
Button "Cerrar Sesión"
     ↓
localStorage.removeItem('access_token')
     ↓
Redirige a /login
```

---

## 🧪 Testing Manual

### Test 1: Login Exitoso
```bash
# 1. Ir a http://localhost:5173
# 2. Entrar con: test@test.com / test123
# 3. Verificar: tabla con usuarios mostrada
```

### Test 2: Login Fallido
```bash
# 1. Ir a http://localhost:5173
# 2. Entrar con: invalid@test.com / wrongpass
# 3. Verificar: error "incorrect_credentials"
```

### Test 3: Acceso Directo sin Token
```bash
# 1. Ir a http://localhost:5173/home/dashboard
# 2. Verificar: redirige a /login
```

### Test 4: Token Inválido
```bash
# 1. Editar localStorage: cambiar token por valores aleatorios
# 2. Ir a http://localhost:5173/home/dashboard
# 3. Verificar: error en consola del backend
```

---

## 📦 Dependencias

### Backend
```
fastapi==0.104.1          # Framework web
uvicorn==0.24.0           # Servidor ASGI
python-jose==3.3.0        # JWT
python-multipart==0.0.6   # Soporte para forms
```

### Frontend
```
vue@^3.3.0                # Framework Vue
vue-router@^4.2.0         # Routing
pinia@^2.1.0              # State management
axios@^1.4.0              # HTTP client
vue-i18n@^9.2.0           # Internacionalización
typescript@^5.0.0         # Type safety
vite@^4.4.0               # Build tool
```

---

## 🚨 Consideraciones de Seguridad

### ✅ Implementado
- JWT con secret key
- Hash mínimo (en producción usar bcrypt)
- Headers Authorization verificados

### ⚠️ NO EN PRODUCCIÓN
- Secret key hardcodeada (usar .env)
- Credenciales en archivo .txt plano (usar base de datos)
- Contraseñas sin encriptar (usar bcrypt)
- CORS abierto (restringir a dominios específicos)

### 🔒 Recomendaciones
```
# .env (backend)
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:pass@localhost/db

# Implementar:
- Bcrypt para contraseñas
- HTTPS en producción
- Rate limiting
- CSRF protection
- SQL injection prevention (si se usa BD)
```

---

## 📚 Tecnologías Utilizadas

### Backend
- **Python 3.x** - Lenguaje
- **FastAPI** - Framework web moderno
- **Uvicorn** - Servidor ASGI
- **PyJWT** - JSON Web Tokens

### Frontend
- **Vue 3** - Framework JavaScript
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Pinia** - State management
- **Axios** - HTTP client
- **SCSS** - Procesador CSS avanzado
- **Vue I18n** - Internacionalización

---

## 📝 Próximos Pasos (Escalabilidad)

### Mejoras Corto Plazo
- [ ] Agregar logout funcional
- [ ] Refresh token implementación
- [ ] Validación de formularios mejorada
- [ ] Error handling más robusto
- [ ] Temas oscuro/claro

### Mejoras Mediano Plazo
- [ ] Cambiar .txt por base de datos (PostgreSQL)
- [ ] Implementar bcrypt para contraseñas
- [ ] Variables de entorno (.env)
- [ ] Tests unitarios y e2e
- [ ] CI/CD pipeline

### Mejoras Largo Plazo
- [ ] Multi-tenant support
- [ ] Role-based access control (RBAC)
- [ ] Audit logs
- [ ] 2FA (Two Factor Authentication)
- [ ] OAuth2 / Social login

---

## 👤 Autor

**Andres Felipe Diaz Castillo**  
📧 [diazccx@gmail.com](mailto:diazccx@gmail.com)

Ejercicio técnico completado como prueba de concepto para autenticación con JWT, validación de archivo .txt y componentes reutilizables.

---

## 📄 Licencia

Este proyecto es de propósito educativo únicamente.

---

**Última actualización:** Marzo 2026
