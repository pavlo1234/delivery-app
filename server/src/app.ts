import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import * as products_router from "./routes/products.js";
import * as orders_router from "./routes/orders.js";
import * as shops_router from "./routes/shops.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms"),
);

app.use(express.json());

app.use("/shops", shops_router.default);
app.use("/products", products_router.default);
app.use("/orders", orders_router.default);

app.get("/", async (req, res) => {
	res.json({ status: "OK" });
});

export default app;
