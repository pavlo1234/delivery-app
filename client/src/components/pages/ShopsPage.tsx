import { useState, useEffect } from "react";

import { getProductsByShop } from "@/api/products";
import type { Product } from "@/api/products";

import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout/Header";

import FilterForm, {
	type FilterFormData,
} from "@/components/functionals/FilterForm";

import ProductsView from "@/components/functionals/ProductsView";

function ShopsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [options, setOptions] = useState<FilterFormData>();

	useEffect(() => {
		getProductsByShop(options?.shop ?? "").then((response) => {
			setProducts(response.products);
		});
	}, [options]);

	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-col lg:flex-row justify-around p-5 gap-5">
				<FilterForm className="lg:w-20/100" onSubmit={setOptions} />
				<ProductsView
					className="lg:w-80/100 mx-auto"
					items={products}
				/>
			</div>
			<Toaster position="top-center" />
		</div>
	);
}

export default ShopsPage;
