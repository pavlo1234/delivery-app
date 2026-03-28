import { client } from "../database/client.js";

export async function getProducts() {
	const products = await client.products.findMany();
	return products;
}

export async function getProductsByShop(title: string) {
	const shop = await client.shops.findUnique({
		where: {
			title: title,
		},
		include: {
			products: true,
		},
	});

	return shop?.products;
}
