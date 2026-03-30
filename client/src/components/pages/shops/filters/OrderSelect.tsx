import { Controller, type UseFormReturn } from "react-hook-form";
import { type ProductsFilter } from "@/api/products";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxInput,
} from "@/components/ui/combobox";

type OrderOption = {
	value: string;
	label: string;
};

type OrderSelectProps = {
	form: UseFormReturn<ProductsFilter>;
	name: keyof ProductsFilter;
};

const orderOptions: OrderOption[] = [
	{ value: "price_asc", label: "Price: Low to High" },
	{ value: "price_desc", label: "Price: High to Low" },
	{ value: "title_asc", label: "Title: A to Z" },
	{ value: "title_desc", label: "Title: Z to A" },
];

function OrderSelect({ form, name }: OrderSelectProps) {
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field }) => (
				<Field>
					<FieldLabel>Order by:</FieldLabel>
					<Combobox
						items={orderOptions}
						value={field.value as string}
						onValueChange={field.onChange}
					>
						<ComboboxInput placeholder="No order" showClear />
						<ComboboxContent>
							<ComboboxEmpty>No options found.</ComboboxEmpty>
							<ComboboxList>
								{(item: OrderOption) => (
									<ComboboxItem key={item.value} value={item}>
										{item.label}
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

export default OrderSelect;
