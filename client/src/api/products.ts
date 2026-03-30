import zod from "zod";
import { shopSchema, type Shop } from "./shops";

const PRODUCTS_URL = import.meta.env.VITE_API_URL + "/products";
const PRODUCTS_API = {
	getProducts: PRODUCTS_URL,
	getCategories: PRODUCTS_URL + "/categories",
};

export type Product = {
	id: number;
	title: string;
	imageUrl: string;
	price: number;
	amount: number;
	shop?: Partial<Shop>;
	category?: Partial<Category>;
};

export const productSchema = zod.object({
	id: zod.number(),
	title: zod.string(),
	imageUrl: zod.string(),
	price: zod.number(),
	amount: zod.number(),
});

export type Category = {
	id: number;
	title: string;
};

const categorySchema = zod.object({
	id: zod.number(),
	title: zod.string(),
});

export type ProductsFilter = {
	shops: Shop[];
	categories: Category[];
	orderBy: "price_asc" | "price_desc" | "title_asc" | "title_desc";
};

const paramsSchema = zod.object({
	shops: zod
		.array(shopSchema)
		.transform((shops?: Shop[]) => shops?.map((s) => s.id).join(","))
		.optional(),
	categories: zod
		.array(categorySchema)
		.transform((categories?: Category[]) =>
			categories?.map((c) => c.id).join(","),
		)
		.optional(),
	orderBy: zod
		.object({
			value: zod.string(),
			label: zod.string(),
		})
		.nullable()
		.transform((order) => order?.value)
		.optional(),
});

export async function getProducts(
	filter?: ProductsFilter,
): Promise<{ products: Product[] }> {
	let url = PRODUCTS_API.getProducts;

	if (filter) {
		const parsedFilter = paramsSchema.parse(filter);
		const params = new URLSearchParams();
		for (const key in parsedFilter) {
			if (parsedFilter[key as keyof typeof parsedFilter]) {
				params.append(
					key,
					parsedFilter[key as keyof typeof parsedFilter] as string,
				);
			}
		}

		url = `${PRODUCTS_API.getProducts}?${params.toString()}`;
	}

	return await fetch(url).then((response) => response.json());
}

export async function getCategories(): Promise<{ categories: Category[] }> {
	return await fetch(PRODUCTS_API.getCategories).then((response) =>
		response.json(),
	);
}
