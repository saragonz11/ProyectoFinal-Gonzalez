# 📦 Instrucciones para Importar Productos a Firestore

Este script te permite importar los 20 productos de FakeStore API directamente a tu colección de Firestore.

## 📋 Prerrequisitos

1. ✅ Proyecto de Firebase creado
2. ✅ Firestore Database habilitada
3. ✅ Archivo `.env` creado con tus credenciales de Firebase

## 🚀 Pasos para Importar

### Paso 1: Verificar que tienes el archivo `.env`

Asegúrate de tener un archivo `.env` en la raíz del proyecto con tus credenciales:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Paso 2: Ejecutar el script de importación

Desde la raíz del proyecto, ejecuta:

```bash
npm run import-products
```

### Paso 3: Verificar la importación

El script mostrará en la consola:

- ✅ Cada producto que se agregó exitosamente
- ❌ Cualquier error que ocurra
- 📊 Resumen final con el total de productos importados

## 📝 Qué hace el script

1. Lee las credenciales de Firebase desde el archivo `.env`
2. Se conecta a tu base de datos Firestore
3. Itera sobre los 20 productos de FakeStore
4. Agrega cada producto a la colección `products` en Firestore
5. Remueve el campo `id` (Firestore genera su propio ID)
6. Remueve el campo `rating` (no se usa en la aplicación)
7. Agrega un campo `stock` con valores aleatorios entre 4-35

## 📊 Estructura de Datos

Cada producto se guardará con esta estructura:

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

## ⚠️ Notas Importantes

- **No duplica productos**: Si ejecutas el script varias veces, creará productos duplicados. Si necesitas limpiar, hazlo manualmente desde Firebase Console.
- **El campo `id` original se elimina**: Firestore genera su propio ID único para cada documento.
- **El campo `rating` se elimina**: No se usa en la aplicación actual.
- **Stock aleatorio**: Se asigna un stock entre 4-35 unidades para cada producto.

## 🆘 Solución de Problemas

### Error: "Las credenciales de Firebase no están configuradas"

- Verifica que el archivo `.env` existe en la raíz del proyecto
- Verifica que las variables tienen los nombres correctos (deben empezar con `VITE_`)
- Asegúrate de que no hay espacios alrededor del `=` en el `.env`

### Error: "Missing or insufficient permissions"

- Ve a Firebase Console → Firestore Database → Reglas
- Asegúrate de que las reglas permiten escritura (modo de prueba):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Error: "Firebase: Error (auth/invalid-api-key)"

- Verifica que copiaste correctamente todas las credenciales
- Asegúrate de que no hay comillas en el archivo `.env`
- Reinicia el script después de corregir el `.env`

## ✅ Verificación

Después de ejecutar el script:

1. Ve a Firebase Console → Firestore Database
2. Deberías ver la colección `products` con 20 documentos
3. Haz clic en un documento para verificar que tiene todos los campos correctos
4. En tu aplicación React, los productos deberían aparecer automáticamente

## 🎉 ¡Listo!

Una vez importados los productos, tu aplicación debería mostrar todos los productos en el catálogo. Las categorías se generarán automáticamente desde los productos importados.
