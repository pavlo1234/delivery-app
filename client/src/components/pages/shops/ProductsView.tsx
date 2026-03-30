import { useState } from "react";
import { toast } from "sonner";

import type { Product } from "@/api/products";

import { useCart } from "@/state/cart";

import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ProductItem from "@/components/functionals/ProductItem";

type ProductCardProps = {
	className?: string | undefined;
	item: Product;
};

function ProductCard({ item }: ProductCardProps) {
	const [amount, setAmount] = useState<number>(1);
	const { addItem } = useCart();
	const notAvailable = item.amount === 0;

	function addToCart() {
		if (item.amount >= amount) {
			addItem(item, amount);
			toast.success("Item has been added to cart");
		}
	}

	return (
		<Card
			className={`max-w-xs w-full h-fit gap-0 ${notAvailable && "grayscale"}`}
		>
			<ProductItem item={item} />
			<CardFooter className="flex flex-row justify-around gap-5">
				<Input
					className="w-min"
					type="number"
					placeholder={`-`}
					min={notAvailable ? 0 : 1}
					max={notAvailable ? 0 : item.amount}
					value={notAvailable ? 0 : amount}
					disabled={notAvailable}
					onChange={(e) => setAmount(Number.parseInt(e.target.value))}
				/>
				<Button
					className="w-full max-w-40 mx-auto cursor-pointer"
					onClick={addToCart}
					disabled={notAvailable}
				>
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}

type ProductsViewProps = {
	className?: string | undefined;
	items: Product[];
};

function ProductsView({ className, items }: ProductsViewProps) {
	return (
		<>
			{" "}
			{items.length ? (
				<div
					className={`${className} flex flex-row flex-wrap gap-5 justify-center`}
				>
					{items.map((item: Product) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<div
					className={`${className} text-md text-center align-center text-gray-500 py-5`}
				>
					No products available.
				</div>
			)}
		</>
	);
}

export default ProductsView;
