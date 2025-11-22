import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con tus credenciales de Firebase
// O usa variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyAVvUoKVbf0hd-Zu9x12E8a0LawDQ7yPeA",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "ecommerce-project-s.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ecommerce-project-s",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "ecommerce-project-s.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "384461332117",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:384461332117:web:b890a05073eb96a6c6859c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;
