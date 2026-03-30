import { useState, useEffect } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { getCategories } from "@/api/products";
import type { Category, ProductsFilter } from "@/api/products";

import { Field, FieldLabel } from "@/components/ui/field";
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

type CategoriesFilterProps = {
	form: UseFormReturn<ProductsFilter>;
	name: keyof ProductsFilter;
};

function CategoriesFilter({ form, name }: CategoriesFilterProps) {
	const [data, setData] = useState<{ categories: Category[] }>({
		categories: [],
	});

	const anchor = useComboboxAnchor();

	useEffect(() => {
		getCategories().then((response) => setData(response));
	}, []);
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field }) => (
				<Field>
					<FieldLabel>Category:</FieldLabel>
					<Combobox
						items={data.categories}
						multiple
						value={field.value as Category[]}
						onValueChange={field.onChange}
					>
						<ComboboxChips ref={anchor}>
							{!(
								field.value &&
								(field.value as Category[]).length > 0
							) ? (
								<div className="text-muted-foreground">
									All categories
								</div>
							) : (
								<ComboboxValue>
									{(field.value as Category[])?.map(
										(item: Category) => (
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
							<ComboboxEmpty>No categories found.</ComboboxEmpty>
							<ComboboxList>
								{(category: Category) => (
									<ComboboxItem
										key={category.id}
										value={category}
									>
										{category.title}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
				</Field>
			)}
		/>
	);
}

export default CategoriesFilter;
