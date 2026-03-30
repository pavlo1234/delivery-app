import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { toast } from "sonner";

import { cartState } from "@/state/cart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldSet, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";

import type { OrderDetails } from "@/api/order";
import { createOrder } from "@/api/order";

const OrderDetailsSchema = zod.object({
	fullname: zod.string("Fullname cannot be empty"),
	email: zod.email("Email must be specified"),
	phone: zod.string("Phone must be specified"),
	address: zod.string("Address must be specified"),
	purchasedAt: zod.iso.datetime().optional(),
});

type OrderFormProps = {
	className?: string;
};

function OrderForm({ className }: OrderFormProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const form = useForm<zod.infer<typeof OrderDetailsSchema>>({
		resolver: zodResolver(OrderDetailsSchema),
	});

	async function onSubmit(details: zod.infer<typeof OrderDetailsSchema>) {
		details.purchasedAt = new Date().toISOString();
		const products = cartState.getState().items.map((item) => ({
			id: item.product.id,
			amount: item.amount,
		}));
		toast.promise(
			createOrder({ details: details as OrderDetails, products }),
			{
				loading: "Processing order...",
				success: "Your order has been received. Thanks!",
				error: "Error during making order",
			},
		);
	}

	return (
		<Card className={`${className} bg-white h-min pb-0`}>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-lg font-bold">
					Order Details:
				</CardTitle>
				<Button variant="link" onClick={() => setIsOpen(!isOpen)}>
					<ChevronDown />
				</Button>
			</CardHeader>
			<Collapsible
				defaultOpen={true}
				open={isOpen}
				onOpenChange={setIsOpen}
				className="h-full"
			>
				<CollapsibleContent className="h-full">
					<CardContent className="py-2 pb-5 h-full">
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col justify-between h-full gap-5"
						>
							<FieldSet>
								<Controller
									name="fullname"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Fullname</FieldLabel>
											<Input
												{...field}
												id={field.name}
												aria-invalid={
													fieldState.invalid
												}
												type="text"
												placeholder="Max Leiter"
												required
											/>
											{fieldState.invalid && (
												<FieldError
													className="text-right"
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
								<Controller
									name="email"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Email</FieldLabel>
											<Input
												{...field}
												id={field.name}
												type="email"
												placeholder="example@gmail.com"
												aria-invalid={
													fieldState.invalid
												}
												required
											/>
											{fieldState.invalid && (
												<FieldError
													className="text-right"
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>

								<Controller
									name="phone"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Phone</FieldLabel>
											<Input
												{...field}
												id={field.name}
												type="tel"
												placeholder="+38 000 000 0000"
												aria-invalid={
													fieldState.invalid
												}
												required
											/>
											{fieldState.invalid && (
												<FieldError
													className="text-right"
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>

								<Controller
									name="address"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Address</FieldLabel>
											<Input
												{...field}
												id={field.name}
												type="text"
												placeholder="123 Fort Avenue, New York, USA"
												aria-invalid={
													fieldState.invalid
												}
												required
											/>
											{fieldState.invalid && (
												<FieldError
													className="text-right"
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</FieldSet>
							<div className="flex flex-col md:flex-row justify-center items-center gap-2">
								<Button
									className="max-w-xs w-1/2"
									type="submit"
								>
									Submit
								</Button>
								<Button
									className="max-w-xs w-1/2"
									variant="outline"
									type="button"
									onClick={() => form.reset()}
								>
									Reset
								</Button>
							</div>
						</form>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
}

export default OrderForm;
