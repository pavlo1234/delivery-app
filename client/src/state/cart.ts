import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/api/products";

export type CartItem = {
	id: number;
	product: Product;
	amount: number;
};

type Cart = {
	items: CartItem[];
	addItem: (item: Product, amount: number) => void;
	changeItem: (id: number, data: Partial<CartItem>) => void;
	deleteItem: (item: CartItem) => void;
	clear: () => void;
};

export const cartState = createStore<Cart>()(
	persist(
		(set, get): Cart => ({
			items: [],
			addItem: (product: Product, amount: number) => {
				set((state) => ({
					items: [
						...state.items,
						{ id: state.items.length, product, amount },
					],
				}));
			},
			changeItem: (id, data) => {
				set((state) => ({
					items: state.items.toSpliced(
						id,
						1,
						Object.assign(get().items[id], data),
					),
				}));
			},
			deleteItem: (item: CartItem) => {
				set((state) => ({
					items: state.items.filter((value) => value !== item),
				}));
			},
			clear: () => {
				set(() => ({
					items: [],
				}));
			},
		}),
		{
			name: "cart-storage",
		},
	),
);

export function useCart() {
	return useStore(cartState);
}
