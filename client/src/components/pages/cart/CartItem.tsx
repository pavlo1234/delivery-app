import { useState, useEffect } from "react";
import { useCart } from "@/state/cart";

import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import ProductItem from "@/components/functionals/ProductItem";

import type { Product } from "@/api/products";

type CartItemProps = {
	item: {
		id: number;
		product: Product;
		amount: number;
	};
};

function CartItem({ item }: CartItemProps) {
	const { deleteItem, changeItem } = useCart();
	const [amount, setAmount] = useState<number>(item.amount);

	useEffect(() => {
		changeItem(item.id, { amount });
	}, [amount]);

	return (
		<Item
			className="w-full flex-row items-center"
			variant="outline"
			role="listitem"
		>
			<ItemContent>
				<ProductItem
					className="flex-row"
					item={item.product}
					imageType="image"
				/>
			</ItemContent>
			<ItemActions>
				<Input
					type="number"
					value={amount}
					placeholder="-"
					min={Math.min(1, item.product.amount)}
					max={item.product.amount}
					onChange={(e) => setAmount(Number.parseInt(e.target.value))}
				/>
				<Button variant="outline" onClick={() => deleteItem(item)}>
					<Trash2 />
				</Button>
			</ItemActions>
		</Item>
	);
}

export default CartItem;
