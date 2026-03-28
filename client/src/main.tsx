import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

import ShopsPage from "./components/pages/ShopsPage";
import CartPage from "./components/pages/CartPage";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<ShopsPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
