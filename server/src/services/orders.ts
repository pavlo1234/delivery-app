import { client } from "../database/client.js";

type OrderDetails = {
	fullname: string;
	email: string;
	phone: string;
	address: string;
	purchasedAt: Date;
};

type ProductsList = {
	id: number;
	amount: number;
}[];

export async function createOrder(
	details: OrderDetails,
	products: ProductsList,
) {
	await client.orders.create({
		data: {
			...details,
			products: {
				create: products.map(({ id, amount }) => ({
					amount,
					product: {
						connect: { id },
					},
				})),
			},
		},
	});
}
