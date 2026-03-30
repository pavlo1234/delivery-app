import { Item, ItemTitle, ItemMedia, ItemContent } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";

import type { Product } from "@/api/products";

type ProductItemProps = {
	item: Product;
	className?: string;
	imageType?: "default" | "image" | "icon";
};

function ProductItem({
	item,
	className,
	imageType = "default",
}: ProductItemProps) {
	return (
		<Item className={`${className} flex flex-row w-full max-w-xs`}>
			<ItemMedia variant={imageType} className="mx-auto">
				<img src={item.imageUrl} className="max-w-full h-auto" />
			</ItemMedia>
			<ItemContent className="flex flex-wrap flex-col gap-1">
				<ItemTitle>{item.title}</ItemTitle>
				<span className="font-bold text-lg">${item.price}</span>
			</ItemContent>
			<div className="flex flex-row flex-wrap gap-1 z-10">
				<Badge>{item.shop?.title}</Badge>
				<Badge variant="secondary">{item.category?.title}</Badge>
			</div>
		</Item>
	);
}

export default ProductItem;
