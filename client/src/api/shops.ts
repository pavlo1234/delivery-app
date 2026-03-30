import zod from "zod";

const SHOPS_URL = import.meta.env.VITE_API_URL + "/shops";
const SHOPS_API = {
	getShops: SHOPS_URL,
};

export type Shop = {
	id: number;
	title: string;
};

export const shopSchema = zod.object({
	id: zod.number(),
	title: zod.string(),
});

const filterSchema = zod.object({
	ratingLess: zod.number().min(1).max(5).optional(),
	ratingGreater: zod.number().min(1).max(5).optional(),
});

type ShopsFilter = zod.infer<typeof filterSchema>;

export async function getShops(
	filter?: ShopsFilter,
): Promise<{ shops: Shop[] }> {
	let url = SHOPS_API.getShops;

	if (filter) {
		const params = new URLSearchParams();
		const parsedFilter = filterSchema.parse(filter);
		for (const key in parsedFilter) {
			if (parsedFilter[key as keyof typeof parsedFilter]) {
				params.append(
					key,
					parsedFilter[
						key as keyof typeof parsedFilter
					]?.toString() ?? "",
				);
			}
		}
		url += `?${params.toString()}`;
	}

	return await fetch(url).then((response) => response.json());
}
