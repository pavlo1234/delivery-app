import { client } from "../database/client.js";

export async function getShops() {
	const shops = await client.shops.findMany();
	return shops;
}
