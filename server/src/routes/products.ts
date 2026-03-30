import { Router } from "express";
import zod from "zod";
import { getCategories, getProducts } from "../services/products.js";

const router = Router();

const querySchema = zod.object({
	shops: zod
		.string()
		.optional()
		.transform((value) => value?.split(",").map(Number) || []),
	categories: zod
		.string()
		.optional()
		.transform((value) => value?.split(",").map(Number) || []),
	orderBy: zod
		.string()
		.optional()
		.transform((value) => {
			if (!value) return {};
			const values: Record<string, "asc" | "desc"> = {};
			for (const part of value.split(",")) {
				const [field, order] = part.split("_");
				if (field && order && (order === "asc" || order === "desc")) {
					values[field] = order;
				}
			}
			return values;
		}),
});
router.get("/", async (req, res) => {
	try {
		const query = querySchema.parse(req.query);
		const products = await getProducts(query);
		res.status(200).json({ products });
	} catch (error) {
		console.error(error);
		res.status(400).json({ status: "Invalid query parameters" });
	}
});

router.get("/categories", async (req, res) => {
	const categories = await getCategories();
	res.status(200).json({ categories });
});

export default router;
