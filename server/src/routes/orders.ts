import { Router } from "express";
import { createOrder } from "../services/orders.js";

const router = Router();

router.post("/", async (req, res) => {
	const { details, products } = req.body;
	await createOrder(details, products);
	res.status(200).json({ status: "OK" });
});

export default router;
