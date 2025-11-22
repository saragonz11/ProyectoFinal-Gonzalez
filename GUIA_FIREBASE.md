# 🔥 Guía Paso a Paso: Configurar Firebase y Crear Colección de Productos

## 📋 Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Agregar proyecto"** o **"Create a project"**
4. Ingresa un nombre para tu proyecto (ej: `mi-tienda-ecommerce`)
5. Opcional: Desactiva Google Analytics si no lo necesitas
6. Haz clic en **"Crear proyecto"** y espera a que se complete

## 📋 Paso 2: Habilitar Firestore Database

1. En el panel del proyecto, busca **"Firestore Database"** en el menú lateral izquierdo
2. Haz clic en **"Crear base de datos"** o **"Create database"**
3. Selecciona **"Comenzar en modo de prueba"** (Start in test mode) - Para desarrollo
4. Elige una **ubicación** para tu base de datos (recomendado: `us-central` o la más cercana a ti)
5. Haz clic en **"Habilitar"** o **"Enable"**
6. Espera a que se cree la base de datos (puede tomar unos minutos)

## 📋 Paso 3: Obtener Credenciales de Firebase

1. En el panel del proyecto, haz clic en el **ícono de engranaje** ⚙️ (Configuración del proyecto)
2. Desplázate hasta la sección **"Tus aplicaciones"** o **"Your apps"**
3. Haz clic en el ícono de **web** `</>`
4. Registra tu app con un nombre (ej: `Mi Tienda Web`)
5. **NO marques** la casilla de Firebase Hosting (no es necesario)
6. Haz clic en **"Registrar app"**
7. **Copia las credenciales** que aparecen. Deberías ver algo como:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
};
```

## 📋 Paso 4: Crear Archivo .env

1. En la raíz de tu proyecto, crea un archivo llamado `.env`
2. Agrega las siguientes variables con tus credenciales:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

**⚠️ IMPORTANTE:**

- Reemplaza los valores con tus credenciales reales
- NO subas este archivo a GitHub (ya está en `.gitignore`)
- Si ya tienes el servidor corriendo, reinícialo después de crear el `.env`

## 📋 Paso 5: Crear Colección de Productos

### Opción A: Desde la Consola de Firebase (Manual)

1. En Firebase Console, ve a **"Firestore Database"**
2. Haz clic en **"Comenzar colección"** o **"Start collection"**
3. **ID de colección**: `products` (exactamente así, en minúsculas)
4. Haz clic en **"Siguiente"**

5. **Agregar el primer documento:**
   - **ID del documento**: Déjalo vacío para que Firebase lo genere automáticamente
   - **Campos del documento** (agrega uno por uno):

| Campo         | Tipo   | Valor de Ejemplo                    |
| ------------- | ------ | ----------------------------------- |
| `title`       | string | "iPhone 15 Pro"                     |
| `description` | string | "El último iPhone con chip A17 Pro" |
| `price`       | number | 999.99                              |
| `image`       | string | "https://example.com/iphone15.jpg"  |
| `category`    | string | "electronics"                       |
| `stock`       | number | 10                                  |

6. Haz clic en **"Guardar"**
7. Repite el proceso para agregar más productos

### Opción B: Usando Script de Node.js (Recomendado para muchos productos)

Crea un archivo `scripts/seedProducts.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productos = [
  {
    title: "iPhone 15 Pro",
    description: "El último iPhone con chip A17 Pro y cámara de 48MP",
    price: 999.99,
    image: "https://example.com/iphone15.jpg",
    category: "electronics",
    stock: 10,
  },
  {
    title: "Samsung Galaxy S24",
    description: "Smartphone Android con pantalla AMOLED de 6.2 pulgadas",
    price: 899.99,
    image: "https://example.com/galaxy-s24.jpg",
    category: "electronics",
    stock: 15,
  },
  {
    title: "Laptop Dell XPS 15",
    description: "Laptop de alto rendimiento con procesador Intel i7",
    price: 1499.99,
    image: "https://example.com/dell-xps.jpg",
    category: "electronics",
    stock: 5,
  },
  {
    title: "Camiseta Nike",
    description: "Camiseta deportiva de algodón 100%",
    price: 29.99,
    image: "https://example.com/nike-shirt.jpg",
    category: "clothing",
    stock: 50,
  },
  {
    title: "Zapatillas Adidas",
    description: "Zapatillas deportivas cómodas para running",
    price: 79.99,
    image: "https://example.com/adidas-shoes.jpg",
    category: "clothing",
    stock: 30,
  },
];

async function seedProducts() {
  try {
    for (const producto of productos) {
      const docRef = await addDoc(collection(db, "products"), producto);
      console.log("Producto agregado con ID:", docRef.id);
    }
    console.log("✅ Todos los productos se agregaron correctamente");
  } catch (error) {
    console.error("❌ Error agregando productos:", error);
  }
}

seedProducts();
```

## 📋 Paso 6: Estructura de Datos Esperada

Cada documento en la colección `products` debe tener esta estructura:

```javascript
{
  title: "string",           // Título del producto
  description: "string",     // Descripción del producto
  price: number,             // Precio (número, ej: 29.99)
  image: "string",           // URL de la imagen
  category: "string",        // Categoría (ej: "electronics", "clothing")
  stock: number              // Stock disponible (opcional, por defecto 10)
}
```

### Ejemplo de Categorías Comunes:

- `electronics` - Electrónica
- `clothing` - Ropa
- `jewelery` - Joyería
- `men's clothing` - Ropa de hombre
- `women's clothing` - Ropa de mujer

## 📋 Paso 7: Verificar que Funciona

1. Reinicia tu servidor de desarrollo:

   ```bash
   # Detén el servidor (Ctrl + C)
   npm run dev
   ```

2. Abre tu navegador en `http://localhost:5175` (o el puerto que te indique)

3. Deberías ver:
   - El catálogo de productos cargando desde Firestore
   - Las categorías en la barra de navegación
   - Poder hacer clic en un producto para ver su detalle

## 📋 Paso 8: Reglas de Seguridad (Opcional pero Recomendado)

Para producción, actualiza las reglas de Firestore:

1. Ve a **Firestore Database** → **Reglas**
2. Reemplaza las reglas por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura de productos a todos
    match /products/{document=**} {
      allow read: if true;
      allow write: if false; // Solo desde la consola o con autenticación
    }

    // Permitir escritura de órdenes a todos (para checkout)
    match /orders/{document=**} {
      allow read: if false; // Solo el admin puede leer
      allow create: if true; // Cualquiera puede crear una orden
    }
  }
}
```

3. Haz clic en **"Publicar"**

## ✅ Checklist Final

- [ ] Proyecto creado en Firebase
- [ ] Firestore Database habilitada
- [ ] Credenciales obtenidas
- [ ] Archivo `.env` creado con las credenciales
- [ ] Colección `products` creada
- [ ] Al menos 3-5 productos agregados
- [ ] Servidor de desarrollo reiniciado
- [ ] Aplicación cargando productos correctamente

## 🆘 Solución de Problemas

### Error: "Firebase: Error (auth/invalid-api-key)"

- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor después de crear/modificar `.env`

### Error: "Missing or insufficient permissions"

- Verifica las reglas de Firestore (deben estar en modo de prueba para desarrollo)
- Asegúrate de que la colección se llame exactamente `products` (minúsculas)

### No se muestran productos

- Verifica que hayas creado la colección `products` (no `Products` o `PRODUCTS`)
- Verifica que los documentos tengan todos los campos requeridos
- Abre la consola del navegador para ver errores específicos

### La colección orders no se crea automáticamente

- Es normal, se creará cuando realices tu primera compra
- Verifica que las reglas de Firestore permitan crear documentos en `orders`

---

**¡Listo!** Tu aplicación debería estar funcionando con Firebase. 🎉
