import styled from "styled-components"

type ContainerProps = {
	userBackgroundColor: string
}

export const Container = styled.article<ContainerProps>`
	width: 100vw;
	height: 100vh;
	background: ${({ userBackgroundColor: userBackground }) => userBackground};
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: column;
`
type CanvasContainerProps = {
	backgroundColor: string
	width: number
	height: number
}

export const CanvasContainer = styled.section<CanvasContainerProps>`
	background-color: ${({ backgroundColor }) => backgroundColor};
	box-shadow: 0 0 18px 4px;
	position: relative;
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
`
