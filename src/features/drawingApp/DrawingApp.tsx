import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useWindowSize } from "../../app/hooks/useWindowSize"
import Canvas from "./components/Canvas"
import Navbar from "./components/Navbar"
import { CanvasContainer, Container } from "./drawingApp.styles"
import {
	draw,
	finishDrawing,
	setBackgroundColor,
	startDrawing,
} from "./drawingAppSlice"

export function DrawingApp() {
	const canvas = useRef<HTMLCanvasElement>(null)
	const helperCanvas = useRef<HTMLCanvasElement>(null)
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
	const [helperCtx, setHelperCtx] = useState<CanvasRenderingContext2D | null>(
		null
	)
	const [boundingRect, setBoundingRect] = useState<any>(null)

	const dispatch = useAppDispatch()
	const [windowWidth, windowHeight] = useWindowSize()
	const backgroundOptions = useAppSelector(
		state => state.drawingApp.backgroundOptions
	)
	const userBackgroundColor = useAppSelector(
		state => state.drawingApp.userBackgroundColor
	)
	const canvasBackgroundColor = useAppSelector(
		state => state.drawingApp.canvasBackgroundColor
	)

	useEffect(() => {
		const userBackground = localStorage.getItem("user-background")

		if (userBackground) {
			dispatch(setBackgroundColor({ value: userBackground }))
			return
		}

		dispatch(setBackgroundColor({ value: backgroundOptions[0].color }))
	}, [])

	useEffect(() => {
		setCtx(canvas.current!.getContext("2d"))
		setHelperCtx(helperCanvas.current!.getContext("2d"))
		setBoundingRect(canvas.current!.getBoundingClientRect())
	}, [windowHeight, windowWidth])

	return (
		<Container userBackgroundColor={userBackgroundColor}>
			<Navbar ctx={ctx!} />
			<CanvasContainer
				width={Math.floor(windowWidth * 0.9)}
				height={Math.floor(windowHeight * 0.8)}
				backgroundColor={canvasBackgroundColor}
				onMouseDown={e => {
					if (!ctx || !helperCtx) return

					dispatch(
						startDrawing({
							ctx,
							helperCtx,
							x: e.clientX - boundingRect.left,
							y: e.clientY - boundingRect.top,
						})
					)
				}}
				onMouseMove={e => {
					if (!ctx || !helperCtx) return

					dispatch(
						draw({
							ctx,
							helperCtx,
							x: e.clientX - boundingRect.left,
							y: e.clientY - boundingRect.top,
						})
					)
				}}
				onMouseUp={e => {
					if (!ctx || !helperCtx) return

					dispatch(
						finishDrawing({
							ctx,
							helperCtx,
							x: e.clientX - boundingRect.left,
							y: e.clientY - boundingRect.top,
						})
					)
				}}
			>
				<Canvas
					width={windowWidth * 0.9}
					height={windowHeight * 0.8}
					reactRef={canvas}
				/>
				<Canvas
					width={Math.floor(windowWidth * 0.9)}
					height={Math.floor(windowHeight * 0.8)}
					reactRef={helperCanvas}
				/>
			</CanvasContainer>
		</Container>
	)
}
