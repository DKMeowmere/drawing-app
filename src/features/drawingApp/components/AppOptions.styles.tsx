import styled from "styled-components"

type AppOptionsProps = {
	isNavbarOpen: boolean
	isColorValueValid: boolean
}
type ColorInputContainerProps = {
	isValueValid: boolean
}

export const AppOptionsContainer = styled.div<AppOptionsProps>`
	width: 100%;
	height: 100vh;
	position: absolute;
	translate: ${({ isNavbarOpen }) => (isNavbarOpen ? 0 : "0 -110vh")};
	transition: 1s all ease-in-out;
	.transparent-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fffc;
	}
	.options {
		position: relative;
		z-index: 1;
		height: 100vh;
		padding-top: 12vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.option-description {
			font-size: 1.4rem;
			font-weight: bold;
			max-width: 80%;
			text-align: center;
		}
		input[type="range"] {
			width: 80%;
			max-width: 400px;
			accent-color: ${({ theme }) => theme.colors.mainBlue};
		}
		.select-background {
			all: unset;
			box-sizing: border-box;
			width: 300px;
			max-width: 80%;
			padding: 15px 45px;
			cursor: pointer;
			background-color: ${({ theme }) => theme.colors.mainBlue};
			color: #fff;
			font-weight: bold;
			font-size: 1rem;
			transition: all 0.3s ease;
			border-radius: 10px;
			text-align: center;
			&:hover {
				filter: brightness(1.1);
				box-shadow: 0 0 20px 2px ${({ theme }) => theme.colors.mainBlue};
			}
		}
	}
	.tools-container {
		display: flex;
		gap: 20px;
		.tool {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5px;
			border: 1px solid black;
			border-radius: 10px;
			cursor: pointer;
			transition: all 0.3s ease;
			svg {
				width: 24px;
				height: 24px;
			}
			&:hover {
				background-color: #ddd;
			}
		}
	}
`

export const ColorInputContainer = styled.div<ColorInputContainerProps>`
	display: flex;
	justify-content: center;
	width: 450px;
	max-width: 80%;
	height: 50px;
	.icon-container {
		width: 10%;
		height: 100%;
		border-radius: 10px 0 0 10px;
		background-color: ${({ isValueValid, theme }) =>
			isValueValid ? theme.colors.mainBlue : theme.colors.error};
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.3s ease;
		&:hover {
			filter: brightness(1.1);
		}
		svg {
			fill: #fff;
		}
	}
	.color-input {
		padding: 5px 15px;
		width: 60%;
		height: 100%;
	}
	.submit-color-button {
		all: unset;
		width: 30%;
		padding: 5px 15px;
		background-color: ${({ isValueValid, theme }) =>
			isValueValid ? theme.colors.mainBlue : theme.colors.error};
		border-radius: 0 10px 10px 0;
		color: #fff;
		text-align: center;
		font-weight: bold;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		&:hover {
			box-shadow: 0 0 20px 2px
				${({ isValueValid, theme }) =>
					isValueValid ? theme.colors.mainBlue : theme.colors.error};
		}
	}
`
