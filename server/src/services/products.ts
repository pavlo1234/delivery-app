import { client } from "../database/client.js";

export async function getProducts({
	shops,
	categories,
	orderBy = {},
}: {
	shops?: number[];
	categories?: number[];
	orderBy?: Record<string, "asc" | "desc">;
}) {
	const filters: {
		shopId?: object;
		categoryId?: object;
	} = {};

	if (shops && shops.length > 0) {
		filters.shopId = {
			in: shops,
		};
	}

	if (categories && categories.length > 0) {
		filters.categoryId = {
			in: categories,
		};
	}

	const products = await client.products.findMany({
		where: {
			AND: [filters],
		},
		select: {
			id: true,
			title: true,
			price: true,
			amount: true,
			imageUrl: true,
			shop: {
				select: {
					id: true,
					title: true,
					rating: true,
				},
			},
			category: {
				select: {
					id: true,
					title: true,
				},
			},
		},
		orderBy: orderBy,
	});
	return products;
}

export async function getCategories() {
	const categories = await client.categories.findMany();
	return categories;
}
