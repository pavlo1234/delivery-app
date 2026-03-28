import { Item, ItemTitle, ItemMedia, ItemContent } from "@/components/ui/item";

import thumbnail from "@/assets/product_thumbnail.png";

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
				<img src={thumbnail} className="max-w-full h-auto" />
			</ItemMedia>

			<ItemContent className="flex flex-wrap flex-row justify-between items-center">
				<ItemTitle>{item.title}</ItemTitle>
				<span className="font-bold text-lg">${item.price}</span>
			</ItemContent>
		</Item>
	);
}

export default ProductItem;
