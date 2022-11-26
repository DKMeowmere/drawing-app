import styled, { css } from "styled-components"

type BurgerProps = {
	isNavbarOpen: boolean
}
export const NavbarContainer = styled.nav`
	width: 100%;
	margin-bottom: 8vh;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
`
export const MainNavbar = styled.div`
	width: 100%;
	height: 60px;
	background-color: #fff;
	box-shadow: 0 0 18px 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
`
export const NavbarBurger = styled.div`
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 8px;
	cursor: pointer;
`
const transformToX = css<any>`
	&:first-child {
		transform-origin: top left;
		rotate: 45deg;
		translate: 7px 0;
	}
	&:nth-child(2) {
		opacity: 0;
	}
	&:last-child {
		transform-origin: bottom left;
		rotate: -45deg;
		translate: 7px 0;
	}
`
export const BurgerFragment = styled.i<BurgerProps>`
	width: 40px;
	height: 5px;
	border-radius: 5px;
	background-color: #000;
	transition: all 0.4s ease;
	${({ isNavbarOpen }) => (isNavbarOpen ? transformToX : "")}
`

