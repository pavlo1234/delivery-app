import { client } from "../database/client.js";

type OrderDetails = {
	fullname: string;
	email: string;
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
			fullname: details.fullname,
			email: details.email,
			address: details.address,
			purchased_at: details.purchasedAt,
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
