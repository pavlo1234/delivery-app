import { client } from "../database/client.js";

export async function getShops({ where }: { where?: any }) {
	const shops = await client.shops.findMany({
		where,
	});

	return shops;
}
