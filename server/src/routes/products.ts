import { Router } from "express";
import { getProducts, getProductsByShop } from "../services/products.js";

const router = Router();

router.get("/", async (req, res) => {
	const products = await getProducts();
	res.status(200).json({ products });
});

router.get("/:shop", async (req, res) => {
	const { shop } = req.params;
	const products = await getProductsByShop(shop);
	res.status(200).json({ products });
});

export default router;
