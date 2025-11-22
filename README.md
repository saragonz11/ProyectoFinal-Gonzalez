# 🛒 Mi Tienda - E-commerce React App

Una aplicación web moderna de e-commerce desarrollada con React que permite navegar entre diferentes vistas: catálogo de productos, vista de detalle de producto, carrito de compras y checkout. Integración completa con Firebase Firestore para almacenar productos y registrar órdenes de compra.

**Proyecto Final: Web App de e-commerce** - Implementación completa con Firebase, y todas las funcionalidades requeridas.

## 🚀 Características

- **Navegación SPA**: Interfaz de una sola página sin recargas usando React Router
- **Catálogo dinámico**: Listado de productos desde Firestore
- **Vista de detalle**: Página detallada de cada producto con información completa
- **Carrito de compras**: Gestión completa del carrito con Context API
- **Checkout integrado**: Formulario de compra que genera órdenes en Firestore
- **Diseño responsive**: Funciona perfectamente en dispositivos móviles y desktop
- **Tiempo real**: Consultas en tiempo real a Firestore para productos y órdenes
- **Validaciones**: Validación de stock, cantidades y formularios
- **Estados de carga**: Indicadores visuales durante la carga de datos
- **Mensajes condicionales**: Feedback claro para el usuario (carrito vacío, sin stock, etc.)

## 🛠️ Stack Tecnológico

### Frontend

- **React** 19.1.1
- **React Router DOM** 7.9.5 (navegación SPA)
- **Vite** 7.1.14 (build tool)
- **CSS3** con gradientes y efectos modernos
- **ESLint** para calidad de código

### Backend / Base de Datos

- **Firebase** 12.6.0
- **Firestore** (base de datos NoSQL en la nube)
- **Firebase Config** (gestión de credenciales)

## 📋 Funcionalidades Principales

### Navegación

- ✅ Navegación SPA sin recargas de página
- ✅ NavLinks con resaltado de ruta activa
- ✅ Navegación fluida entre todas las vistas

### Productos

- ✅ Listado completo de productos desde Firestore
- ✅ Vista de detalle con imagen, descripción y precio
- ✅ Consultas optimizadas con `getDoc`, `getDocs` y `query`
- ✅ Formato de precios localizado (es-CO, USD)

### Carrito de Compras

- ✅ Estado global con Context API
- ✅ Agregar/eliminar productos
- ✅ Actualizar cantidades
- ✅ Cálculo automático de subtotales y total
- ✅ Widget del carrito con contador de unidades

### ItemCount

- ✅ Validación de cantidad mínima y máxima (según stock)
- ✅ Botones increment/decrement con estados disabled
- ✅ Ocultación después de agregar al carrito
- ✅ Mensaje de confirmación visual

### Checkout

- ✅ Formulario con validación de campos
- ✅ Creación de orden en Firestore
- ✅ Registro completo de compra (buyer, items, total, fecha)
- ✅ Mostrar ID de orden al usuario
- ✅ Limpieza automática del carrito

### Experiencia de Usuario

- ✅ Estados de carga con loaders
- ✅ Mensajes condicionales (sin stock, carrito vacío)
- ✅ Manejo de errores visible
- ✅ Confirmación visual de acciones

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── BarraNavegacion.jsx          # NavBar con categorías dinámicas
│   ├── ItemListContainer.jsx        # Contenedor de lista de productos
│   ├── ItemList.jsx                 # Componente presentacional - Lista
│   ├── ItemDetailContainer.jsx      # Contenedor de detalle de producto
│   ├── ItemDetail.jsx               # Componente presentacional - Detalle
│   ├── ProductCard.jsx              # Componente presentacional - Card
│   ├── ItemCount.jsx                # Contador de cantidad
│   ├── WidgetCarrito.jsx            # Widget del carrito (CartWidget)
│   ├── Cart.jsx                     # Componente del carrito
│   ├── CartItem.jsx                 # Componente presentacional - Item del carrito
│   └── CheckoutForm.jsx             # Formulario de checkout
├── context/
│   └── CartContext.jsx              # Context y Provider del carrito
├── services/
│   └── firestoreService.js          # Servicios de Firestore
├── firebase/
│   └── config.js                    # Configuración de Firebase
├── App.jsx                          # Componente principal con rutas
├── main.jsx                         # Punto de entrada con BrowserRouter
├── App.css                          # Estilos globales
└── index.css                        # Estilos base
```

## 🧩 Arquitectura de Componentes

### Contenedores (State & Effects)

- **ItemListContainer**: Maneja estado de productos, carga y filtrado por categoría
- **ItemDetailContainer**: Maneja estado del producto seleccionado y agregado al carrito

### Presentacionales (UI)

- **ItemList**: Renderiza grid de productos
- **ItemDetail**: Muestra detalle completo del producto
- **ProductCard**: Card individual de producto
- **CartItem**: Item individual del carrito
- **ItemCount**: Contador con validaciones
- **BarraNavegacion**: Navegación con categorías
- **WidgetCarrito**: Widget visual del carrito
- **Cart**: Vista completa del carrito
- **CheckoutForm**: Formulario de checkout

### Context API

- **CartContext**: Gestión global del estado del carrito
  - `addItem`: Agregar producto al carrito
  - `removeItem`: Eliminar producto del carrito
  - `clearCart`: Limpiar todo el carrito
  - `updateItemQuantity`: Actualizar cantidad
  - `getTotalQuantity`: Obtener total de unidades
  - `getTotal`: Obtener total en dinero
  - `isInCart`: Verificar si producto está en carrito

## 🛣️ Rutas Implementadas

- `/` - Catálogo principal de productos
- `/item/:id` - Vista de detalle del producto
- `/cart` - Vista del carrito de compras
- `/checkout` - Formulario de checkout y confirmación
- `*` - Página 404 para rutas no encontradas

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Firebase con proyecto creado
- Firestore Database habilitada

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd entrega1

# Instalar dependencias
npm install

# Configurar variables de entorno (ver sección Firebase)
# Crear archivo .env con tus credenciales de Firebase

# Iniciar servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` (o el puerto que indique Vite) en tu navegador.

### Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Ejecutar ESLint
npm run import-products  # Importar productos de ejemplo a Firestore
```

## 🔥 Configuración de Firebase

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Firestore Database** en modo de prueba
4. Obtén tus credenciales desde Configuración del proyecto → Tus aplicaciones

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**⚠️ IMPORTANTE**: El archivo `.env` está en `.gitignore` para proteger tus credenciales.

### 3. Crear Colección de Productos

#### Opción A: Manualmente desde Firebase Console

1. Ve a Firestore Database
2. Crea colección `products`
3. Agrega documentos con la estructura:
   ```javascript
   {
     title: "string",
     description: "string",
     price: number,
     image: "string (URL)",
     category: "string",
     stock: number
   }
   ```

#### Opción B: Usando el Script de Importación

```bash
npm run import-products
```

Este script importa 20 productos de ejemplo desde FakeStore API a tu Firestore.

📖 Ver `GUIA_FIREBASE.md` para instrucciones detalladas

### Estructura de Datos

#### Colección `products`

```javascript
{
  title: "iPhone 15 Pro",
  description: "El último iPhone con chip A17 Pro",
  price: 999.99,
  image: "https://example.com/iphone15.jpg",
  category: "electronics",
  stock: 10
}
```

## 🎨 Diseño

- **Tema oscuro** con gradientes dorados
- **Tipografía** clara y legible
- **Espaciado** consistente
- **Colores** profesionales
- **Layout responsive** para todos los dispositivos
- **Transiciones** suaves y efectos hover
- **Estados visuales** claros (loading, error, éxito)

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Deploy automático en cada push a `main`

### Netlify

1. Conecta tu repositorio de GitHub a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura las variables de entorno en Netlify Dashboard

### Variables de Entorno en Producción

Asegúrate de configurar todas las variables de Firebase en la plataforma de deploy:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## ✅ Requisitos Cumplidos

### Listado y Detalle de Productos

- ✅ Generación dinámica del listado (ItemListContainer)
- ✅ Vista de detalle (ItemDetailContainer)
- ✅ Separación contenedores/presentacionales
- ✅ ItemCount con validaciones (min, max por stock)
- ✅ Ocultación de ItemCount después de agregar

### Navegación

- ✅ Navegación SPA con React Router
- ✅ NavLinks con styling apropiado
- ✅ `useParams()` y `useEffect` para cambios de ruta

### Carrito de Compras

- ✅ CartContext para estado global
- ✅ Cart con productos, cantidades, subtotales y totales
- ✅ CartWidget mostrando total de unidades

### Firebase

- ✅ Firestore como base de datos
- ✅ Consultas con `getDoc`, `getDocs` y `query`
- ✅ Creación de órdenes en Firestore
- ✅ Registro completo de compras

### Experiencia de Usuario

- ✅ Renderizado condicional para loaders
- ✅ Mensajes condicionales (sin stock, carrito vacío)
- ✅ Mostrar ID de orden al usuario

## 📚 Documentación Adicional

- `GUIA_FIREBASE.md` - Guía completa para configurar Firebase
- `INSTRUCCIONES_IMPORTACION.md` - Instrucciones para importar productos

## 👨‍💻 Autor

**Sara Gonzalez Londono**  
Diplomado de Desarrollo React - Coderhouse  
Proyecto Final: Web App de e-commerce

## 📄 Licencia

Este proyecto es parte de un curso académico y está destinado únicamente para fines educativos.

---

## 🆘 Solución de Problemas

### Error: "Firebase: Error (auth/invalid-api-key)"

- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor después de crear/modificar `.env`

### Error: "Missing or insufficient permissions"

- Verifica las reglas de Firestore (deben estar en modo de prueba para desarrollo)
- Asegúrate de que la colección se llame exactamente `products` (minúsculas)

### No se muestran productos

- Verifica que hayas creado la colección `products` en Firestore
- Verifica que los documentos tengan todos los campos requeridos
- Abre la consola del navegador para ver errores específicos

### La colección orders no se crea automáticamente

- Es normal, se creará cuando realices tu primera compra
- Verifica que las reglas de Firestore permitan crear documentos en `orders`
