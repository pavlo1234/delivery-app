import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout/Header";

import OrderForm from "@/components/pages/cart/OrderForm";
import CartView from "@/components/pages/cart/CartView";

function CartPage() {
	return (
		<div className="flex flex-col mx-auto w-full">
			<Header />
			<div className="flex flex-col lg:flex-row gap-5 p-5 lg:h-[85vh]">
				<OrderForm className="lg:w-1/2 lg:h-full" />
				<CartView className="lg:w-1/2 lg:h-full" />
			</div>
			<Toaster position="top-center" />
		</div>
	);
}

export default CartPage;
