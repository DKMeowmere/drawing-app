import React from "react"
import { StyledCanvas } from "./canvas.styles"

type CanvasProps = {
	width: number
	height: number
	reactRef: React.RefObject<HTMLCanvasElement>
}

export default function Canvas({ width, height, reactRef }: CanvasProps) {
	return <StyledCanvas width={width} height={height} ref={reactRef} />
}
