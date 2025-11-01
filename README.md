# 🛒 Mi Tienda - E-commerce React App

## 📋 Descripción

Aplicación de e-commerce desarrollada con React que permite navegar entre diferentes vistas: catálogo de productos, productos filtrados por categorías y vista de detalle de producto. Integración con FakeStore API para obtener datos de productos en tiempo real.

**Entrega 2: Navega las rutas** - Implementación completa de routing y navegabilidad.

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── BarraNavegacion.jsx          # NavBar con categorías dinámicas
│   ├── ItemListContainer.jsx        # Contenedor de lista de productos
│   ├── ItemDetailContainer.jsx      # Contenedor de detalle de producto
│   ├── ProductGrid.jsx              # Componente presentacional - Grid
│   ├── ProductCard.jsx              # Componente presentacional - Card
│   ├── ItemCount.jsx                # Contador de cantidad
│   └── WidgetCarrito.jsx            # Widget del carrito
├── App.jsx                          # Componente principal con rutas
├── main.jsx                         # Punto de entrada con BrowserRouter
└── App.css                          # Estilos globales
```

## 🧩 Componentes

### Contenedores (State & Effects)

- **ItemListContainer**: Maneja el estado de productos, carga y filtrado por categoría
- **ItemDetailContainer**: Maneja el estado del producto seleccionado y cantidad

### Presentacionales (UI)

- **ProductGrid**: Renderiza grid de productos con `map()` y `key`
- **ProductCard**: Card individual de producto con formato de precio
- **ItemCount**: Contador de cantidad con botones increment/decrement y "Agregar al carrito"
- **BarraNavegacion**: Navegación con categorías dinámicas desde API
- **WidgetCarrito**: Widget visual del carrito

## 🛣️ Rutas Implementadas

- `/` - Catálogo principal de productos
- `/category/:categoryId` - Catálogo filtrado por categoría
- `/item/:id` - Vista de detalle del producto
- `*` - Página 404 para rutas no encontradas

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd entrega1

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## ✨ Funcionalidades

### Navegación

- ✅ Navegación entre vistas usando React Router
- ✅ Enlaces dinámicos a categorías desde la API
- ✅ Navegación desde catálogo al detalle del producto
- ✅ Resaltado de categoría activa en el menú

### Productos

- ✅ Listado de productos desde FakeStore API
- ✅ Filtrado por categorías dinámicas
- ✅ Vista de detalle con imagen, título, descripción y precio
- ✅ Formato de precios con `Intl.NumberFormat` (es-CO, USD)

### Interacción

- ✅ Contador de cantidad (ItemCount) con validación min/max
- ✅ Botón "Agregar al carrito" (preparado para próxima entrega)
- ✅ Estados de carga y error visuales
- ✅ Lazy loading de imágenes

## 🔌 API Utilizada

**FakeStore API**: https://fakestoreapi.com

Endpoints:

- `GET /products` - Todos los productos
- `GET /products/categories` - Lista de categorías
- `GET /products/category/:category` - Productos por categoría
- `GET /products/:id` - Detalle de producto

## ✅ Requisitos Cumplidos (Entrega 2)

### Routing

- ✅ React Router implementado con BrowserRouter
- ✅ Rutas configuradas: `/`, `/category/:categoryId`, `/item/:id`, `*`
- ✅ Hook `useParams()` para leer parámetros de URL
- ✅ `useEffect` con dependencias correctas (categoryId, id)

### Componentes

- ✅ Separación contenedores/presentacionales
- ✅ Llamadas asíncronas con Promise y delay simulado
- ✅ `Array.map()` con prop `key` para listar productos
- ✅ ItemCount integrado en detalle de producto

### UX

- ✅ Estados de carga y error visibles
- ✅ NavLink con clase activa para categorías
- ✅ Navegación fluida entre vistas
- ✅ Formato de precios localizado

## 🛠️ Tecnologías

- **React** 19.1.1
- **React Router DOM** 7.9.5
- **Vite** 7.1.14
- **CSS3** con gradientes y efectos modernos
- **ESLint** para calidad de código

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 🎨 Características de Diseño

- Diseño oscuro moderno con gradientes dorados
- Responsive design para móviles y tablets
- Transiciones suaves y efectos hover
- Imágenes con lazy loading
- Tipografía y espaciado optimizados

## 📦 Próximas Mejoras

- [ ] Implementación del carrito de compras
- [ ] Persistencia de datos del carrito
- [ ] Búsqueda de productos
- [ ] Filtros avanzados
- [ ] Traducción de descripciones (opcional)

## 👨‍💻 Autor

**Sara Gonzalez Londono**  
Diplomado de Desarrollo React - Coderhouse

---

_Desarrollado con ❤️ usando React, React Router y Vite_
