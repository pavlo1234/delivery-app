import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";

import CartItem from "@/components/functionals/CartItem";
import { useCart } from "@/state/cart";

type CartViewProps = {
	className: string;
};

function CartView({ className }: CartViewProps) {
	const { items, clear } = useCart();
	const totalPrice = items.reduce(
		(prev, item) => (prev += item.product.price * item.amount),
		0,
	);

	return (
		<Card className={`${className} h-min`}>
			<Collapsible
				defaultOpen={true}
				className="h-full flex flex-col justify-between"
			>
				<CardHeader className="flex flex-row items-center justify-between pb-5">
					<CardTitle className="text-lg font-bold">
						Products:
					</CardTitle>
					<CollapsibleTrigger asChild>
						<Button variant="ghost">
							<ChevronDown />
						</Button>
					</CollapsibleTrigger>
				</CardHeader>
				<CollapsibleContent className="h-75/100">
					<CardContent className="h-full">
						<ScrollArea className="h-full py-2 pr-5">
							{!items.length ? (
								<div className="text-md text-center align-center text-gray-500 py-5">
									No products added yet
								</div>
							) : (
								<ItemGroup className="items-center">
									{items.map((item) => (
										<CartItem
											key={item.product.id}
											item={item}
										/>
									))}
								</ItemGroup>
							)}
						</ScrollArea>
					</CardContent>
				</CollapsibleContent>
				<CardFooter className="flex flex-row justify-between items-center p-5 ">
					<span className="text-lg font-bold ">
						Total price: ${totalPrice.toFixed(2)}
					</span>
					<Button variant="outline" onClick={clear}>
						Clear
					</Button>
				</CardFooter>
			</Collapsible>
		</Card>
	);
}

export default CartView;
