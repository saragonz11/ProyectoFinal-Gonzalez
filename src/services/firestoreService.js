import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Referencias a colecciones
const productsCollection = collection(db, "products");
const ordersCollection = collection(db, "orders");

/**
 * Obtiene todos los productos de Firestore
 * @returns {Promise<Array>} Array de productos
 */
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw new Error("Error al obtener productos");
  }
};

/**
 * Obtiene un producto por su ID
 * @param {string} productId - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export const getProductById = async (productId) => {
  try {
    const productDoc = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDoc);

    if (!productSnapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    return {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    };
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    throw new Error("Error al obtener el producto");
  }
};

/**
 * Obtiene productos filtrados por categoría
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<Array>} Array de productos filtrados
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const q = query(productsCollection, where("category", "==", categoryId));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error obteniendo productos por categoría:", error);
    throw new Error("Error al obtener productos por categoría");
  }
};

/**
 * Obtiene todas las categorías únicas de los productos
 * @returns {Promise<Array>} Array de categorías
 */
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const categoriesSet = new Set();
    querySnapshot.docs.forEach((docSnapshot) => {
      const category = docSnapshot.data().category;
      if (category) {
        categoriesSet.add(category);
      }
    });
    return Array.from(categoriesSet);
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    throw new Error("Error al obtener categorías");
  }
};

/**
 * Crea una nueva orden en Firestore
 * @param {Object} orderData - Datos de la orden
 * @param {Object} orderData.buyer - Información del comprador
 * @param {Array} orderData.items - Items de la orden
 * @param {number} orderData.total - Total de la orden
 * @returns {Promise<string>} ID de la orden creada
 */
export const createOrder = async (orderData) => {
  try {
    const order = {
      buyer: orderData.buyer,
      items: orderData.items,
      total: orderData.total,
      date: Timestamp.now(),
    };

    const docRef = await addDoc(ordersCollection, order);
    return docRef.id;
  } catch (error) {
    console.error("Error creando orden:", error);
    throw new Error("Error al crear la orden");
  }
};
