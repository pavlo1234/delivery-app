import type { Product } from "./products";

const ORDERS_URL = import.meta.env.VITE_API_URL + "/orders";
const ORDERS_API = {
	createOrder: ORDERS_URL + "/",
};

export type OrderDetails = {
	fullname: string;
	email: string;
	phone: string;
	address: string;
	purchasedAt: string;
};

export type Order = {
	details: OrderDetails;
	products: Pick<Product, "id" | "amount">[];
};

export async function createOrder(order: Order) {
	return await fetch(ORDERS_API.createOrder, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order),
	});
}
