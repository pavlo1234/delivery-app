import { Router } from "express";
import zod from "zod";
import { getShops } from "../services/shops.js";

const router = Router();

const querySchema = zod.object({
	ratingGreater: zod
		.string()
		.optional()
		.transform((str) => Number(str) || undefined),
	ratingLess: zod
		.string()
		.optional()
		.transform((str) => Number(str) || undefined),
});
router.get("/", async (req, res) => {
	const query = querySchema.parse(req.query);
	const shops = await getShops({
		where: {
			rating: {
				...(query.ratingGreater !== undefined
					? { gte: query.ratingGreater }
					: {}),
				...(query.ratingLess !== undefined
					? { lte: query.ratingLess }
					: {}),
			},
		},
	});
	res.status(200).json({ shops });
});

export default router;
