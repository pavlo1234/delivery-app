import { Router } from "express";
import { createOrder } from "../services/orders.js";
import zod from "zod";

const router = Router();

const schema = zod.object({
	details: zod.object({
		fullname: zod.string().nonempty(),
		email: zod.email().nonempty(),
		phone: zod.string().nonempty(),
		address: zod.string().nonempty(),
		purchasedAt: zod.iso
			.datetime()
			.nonempty()
			.transform((value) => new Date(value)),
	}),
	products: zod
		.array(
			zod.object({
				id: zod.int(),
				amount: zod.int().positive(),
			}),
		)
		.refine((arr) => arr.length > 0),
});
router.post("/", async (req, res) => {
	try {
		const { details, products } = schema.parse(req.body);
		await createOrder(details, products);
		res.status(200).json({ status: "OK" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: "Invalid request" });
	}
});

export default router;
