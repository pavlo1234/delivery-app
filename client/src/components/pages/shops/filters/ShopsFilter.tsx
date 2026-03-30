import { useState, useEffect } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { getShops, type Shop } from "@/api/shops";
import type { ProductsFilter } from "@/api/products";

import { Field, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";

type ShopsFilterProps = {
	form: UseFormReturn<ProductsFilter>;
	name: keyof ProductsFilter;
};

function ShopsFilter({ form, name }: ShopsFilterProps) {
	const anchor = useComboboxAnchor();

	const [ratingRange, setRatingRange] = useState([1, 5]);
	const [data, setData] = useState<{ shops: Shop[] }>({ shops: [] });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getShops({
			ratingLess: ratingRange[1],
			ratingGreater: ratingRange[0],
		}).then((response) => {
			setData(response);
			setIsLoading(false);
		});
	}, [ratingRange]);

	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field }) => (
				<Field>
					<FieldLabel className="flex justify-between">
						<span>Shop:</span>
						{isLoading && (
							<div className="flex flex-row item-center text-muted-foreground">
								<Spinner className="size-4" />
								<span className="ml-2">Loading...</span>
							</div>
						)}
					</FieldLabel>
					<Combobox
						items={data.shops}
						multiple
						value={field.value as Shop[]}
						onValueChange={field.onChange}
					>
						<ComboboxChips ref={anchor}>
							{!(field.value && field.value.length > 0) ? (
								<div className="text-muted-foreground">
									All shops
								</div>
							) : (
								<ComboboxValue>
									{(field.value as Shop[])?.map(
										(item: Shop) => (
											<ComboboxChip key={item.id}>
												{item.title}
											</ComboboxChip>
										),
									)}
								</ComboboxValue>
							)}

							<ComboboxChipsInput />
						</ComboboxChips>
						<ComboboxContent anchor={anchor}>
							<ComboboxEmpty>No shops found.</ComboboxEmpty>
							<ComboboxList>
								{(shop: Shop) => (
									<ComboboxItem key={shop.id} value={shop}>
										{shop.title}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
					<div className="flex flex-col">
						<FieldLabel>Rating:</FieldLabel>

						<Slider
							value={ratingRange}
							onValueChange={setRatingRange}
							min={1}
							max={5}
							step={1}
							className="mt-5 mb-2 w-full"
						/>
						<div className="flex justify-between">
							<span>{ratingRange[0]}</span>
							<span>{ratingRange[1]}</span>
						</div>
					</div>
				</Field>
			)}
		/>
	);
}

export default ShopsFilter;
