import { useForm } from "react-hook-form";

import { ChevronDown } from "lucide-react";

import type { ProductsFilter } from "@/api/products";

import { Field, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import ShopsFilter from "@/components/pages/shops/filters/ShopsFilter";
import CategoriesFilter from "@/components/pages/shops/filters/CategoriesFilter";
import OrderSelect from "@/components/pages/shops/filters/OrderSelect";

type FilterFormProps = {
	className?: string | undefined;
	onSubmit: (data: ProductsFilter) => void;
};

function FilterForm({ className, onSubmit }: FilterFormProps) {
	const form = useForm<ProductsFilter>();

	return (
		<Card className={`${className} h-fit`}>
			<Collapsible defaultOpen={true}>
				<div className="flex flex-row justify-between items-center px-5">
					<CardTitle className="font-bold">Filters:</CardTitle>
					<CollapsibleTrigger asChild>
						<Button variant="link">
							<ChevronDown />
						</Button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<CardContent className="pt-2">
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full"
						>
							<FieldSet>
								<ShopsFilter form={form} name="shops" />
								<FieldSeparator />
								<CategoriesFilter
									form={form}
									name="categories"
								/>
								<OrderSelect form={form} name="orderBy" />
								<Field
									className="flex flex-row flex-wrap items-center justify-center"
									orientation="horizontal"
								>
									<Button
										className="max-w-xs w-full"
										type="submit"
									>
										Apply
									</Button>
								</Field>
							</FieldSet>
						</form>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
}

export default FilterForm;
