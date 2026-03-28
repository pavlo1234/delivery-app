import type { ReactElement } from "react";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type MenuProps = {
	items: ReactElement[];
};

function NavMenu({ items }: MenuProps) {
	return (
		<>
			<nav className="flex-row gap-10 hidden md:flex">{items}</nav>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="link" className="sm:hidden cursor-pointer">
						<Menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="p-5 mr-5">
					{items.map((item) => (
						<>
							<DropdownMenuItem>{item}</DropdownMenuItem>
							<DropdownMenuSeparator />
						</>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

export default NavMenu;
