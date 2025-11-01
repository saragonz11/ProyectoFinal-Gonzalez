const API_BASE = "https://fakestoreapi.com";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error("Error obteniendo categorías");
  const data = await res.json();
  await delay(200);
  return data;
}

export async function getProducts(categoryId) {
  const endpoint = categoryId
    ? `${API_BASE}/products/category/${encodeURIComponent(categoryId)}`
    : `${API_BASE}/products`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Error obteniendo productos");
  const data = await res.json();
  await delay(500);
  return data;
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Error obteniendo producto");
  const data = await res.json();
  await delay(400);
  return data;
}


