import { Link } from "react-router";

import NavMenu from "./NavMenu";

function Header() {
	return (
		<header className="bg-white z-1 flex flex-row items-center justify-between ] h-25 lg:h-[15vh] px-10 border-b-2">
			<h1 className="font-bold text-2xl">DeliveryApp</h1>
			<NavMenu
				items={[
					<Link
						className="font-semibold text-lg active:underline"
						to="/"
					>
						Shops
					</Link>,
					<Link
						className="font-semibold text-lg active:underline"
						to="/cart"
					>
						Cart
					</Link>,
				]}
			/>
		</header>
	);
}

export default Header;
