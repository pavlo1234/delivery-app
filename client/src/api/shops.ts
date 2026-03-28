const SHOPS_URL = import.meta.env.VITE_API_URL + "/shops";
const SHOPS_API = {
	getShops: SHOPS_URL,
};

export type Shop = {
	id?: number;
	title: string;
};

export async function getShops(): Promise<{ shops: Shop[] }> {
	return await fetch(`${SHOPS_API.getShops}`).then((response) =>
		response.json(),
	);
}
