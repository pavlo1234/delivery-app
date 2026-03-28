import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";

import { getShops } from "@/api/shops";
import type { Shop } from "@/api/shops";

type FilterBarProps = {
	className?: string | undefined;
	onSubmit: (data: FilterFormData) => void;
};

export interface FilterFormData {
	shop: string;
}

function FilterBar({ className, onSubmit }: FilterBarProps) {
	const form = useForm<FilterFormData>();

	const [data, setData] = useState<{ shops: Shop[] }>({ shops: [] });

	useEffect(() => {
		getShops().then((response) => setData(response));
	}, []);

	return (
		<Card className={`${className} h-fit lg:sticky top-5`}>
			<Collapsible defaultOpen={true}>
				<div className="flex flex-row justify-between items-center px-5">
					<CardTitle className="font-bold">Filter</CardTitle>
					<CollapsibleTrigger asChild>
						<Button variant="ghost">
							<ChevronDown />
						</Button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<CardContent className="pt-2">
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FieldSet>
								<Controller
									name="shop"
									control={form.control}
									defaultValue=""
									render={({ field, fieldState }) => (
										<Field
											data-invalid={fieldState.invalid}
											orientation="responsive"
										>
											<FieldLabel>Shop:</FieldLabel>
											<Select
												name={field.name}
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select shop..." />
												</SelectTrigger>
												<SelectContent position="popper">
													{(data.shops ?? []).map(
														(shop: Shop) => (
															<SelectItem
																key={shop.id}
																value={
																	shop.title
																}
															>
																{shop.title}
															</SelectItem>
														),
													)}
												</SelectContent>
											</Select>
										</Field>
									)}
								/>

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
									<Button
										className="max-w-xs w-full"
										type="button"
										variant="outline"
										onClick={() => form.reset()}
									>
										Clear
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

export default FilterBar;
