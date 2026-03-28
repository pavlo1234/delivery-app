const PRODUCTS_URL = import.meta.env.VITE_API_URL + "/products";
const PRODUCTS_API = {
	getProducts: PRODUCTS_URL,
	getShops: PRODUCTS_URL + "/shops",
};

export type Product = {
	id: number;
	title: string;
	price: number;
	amount: number;
};

export async function getProducts(): Promise<{ products: Product[] }> {
	return await fetch(PRODUCTS_API.getProducts).then((response) =>
		response.json(),
	);
}

export async function getProductsByShop(
	shop: string,
): Promise<{ products: Product[] }> {
	return await fetch(`${PRODUCTS_API.getProducts}/${shop}`).then((response) =>
		response.json(),
	);
}
