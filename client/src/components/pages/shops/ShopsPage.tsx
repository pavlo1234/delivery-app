import { useState, useEffect } from "react";

import { toast } from "sonner";

import { getProducts } from "@/api/products";
import type { Product, ProductsFilter } from "@/api/products";

import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout/Header";

import FilterForm from "@/components/pages/shops/FilterForm";
import ProductsView from "@/components/pages/shops/ProductsView";

function ShopsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [options, setOptions] = useState<ProductsFilter>();

	useEffect(() => {
		toast.promise(
			getProducts(options).then((response) =>
				setProducts(response.products),
			),
			{
				loading: "Loading...",
				error: "Error during loading products",
			},
		);
	}, [options]);

	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-col items-center lg:flex-row lg:items-start justify-around p-5 gap-5">
				<FilterForm
					className="lg:sticky top-5 w-full max-w-xs "
					onSubmit={setOptions}
				/>
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
