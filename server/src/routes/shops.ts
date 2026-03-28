import { Router } from "express";
import { getShops } from "../services/shops.js";

const router = Router();

router.get("/", async (req, res) => {
	const shops = await getShops();
	res.status(200).json({ shops });
});

export default router;
