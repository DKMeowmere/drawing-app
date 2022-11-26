import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toggleIsNavbarOpen } from "../drawingAppSlice"
import {
	BurgerFragment,
	NavbarBurger,
	NavbarContainer,
	MainNavbar,
} from "./navbar.styles"
import AppOptions from "./AppOptions"

type NavbarProps = {
	ctx: CanvasRenderingContext2D
}

export default function Navbar({ ctx }: NavbarProps) {
	const dispatch = useAppDispatch()
	const isNavbarOpen = useAppSelector(state => state.drawingApp.isNavbarOpen)

	return (
		<NavbarContainer>
			<MainNavbar>
				<NavbarBurger onClick={() => dispatch(toggleIsNavbarOpen())}>
					<BurgerFragment isNavbarOpen={isNavbarOpen} />
					<BurgerFragment isNavbarOpen={isNavbarOpen} />
					<BurgerFragment isNavbarOpen={isNavbarOpen} />
				</NavbarBurger>
			</MainNavbar>
			<AppOptions ctx={ctx} />
		</NavbarContainer>
	)
}
