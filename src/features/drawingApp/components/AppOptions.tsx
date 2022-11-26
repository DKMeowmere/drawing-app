import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
	setBackgroundColor,
	updateCanvasBackgroundColor,
	updateLineColor,
	updateLineSize,
	toggleEraser,
	clearCanvas,
	changeTool,
} from "../drawingAppSlice"
import { AppOptionsContainer, ColorInputContainer } from "./AppOptions.styles"
import { BsEraser, BsEraserFill } from "react-icons/bs"
import { IoIosBrush, IoMdSquare, IoMdSquareOutline } from "react-icons/io"
import { HiOutlineMinus } from "react-icons/hi"
import { ImBin } from "react-icons/im"
import { BsCircleFill, BsCircle } from "react-icons/bs"

type AppOptionsProps = {
	ctx: CanvasRenderingContext2D
}

export default function AppOptions({ ctx }: AppOptionsProps) {
	const dispatch = useAppDispatch()
	const isNavbarOpen = useAppSelector(state => state.drawingApp.isNavbarOpen)
	const isColorValueValid = useAppSelector(
		state => state.drawingApp.isColorValueValid
	)
	const isCanvasBackgroundColorValueValid = useAppSelector(
		state => state.drawingApp.isCanvasBackgroundColorValueValid
	)
	const isEraserEnabled = useAppSelector(
		state => state.drawingApp.isEraserEnabled
	)
	const lineSize = useAppSelector(state => state.drawingApp.lineSize)
	const lineColor = useAppSelector(state => state.drawingApp.lineColor)
	const canvasBackgroundColor = useAppSelector(
		state => state.drawingApp.canvasBackgroundColor
	)
	const backgroundOptions = useAppSelector(
		state => state.drawingApp.backgroundOptions
	)
	const userToolTypeName = useAppSelector(
		state => state.drawingApp.userToolTypeName
	)
	const [inputColorValue, setInputColorValue] = useState("")
	const [inputCanvasColorValue, setInputCanvasColorValue] = useState("")

	return (
		<AppOptionsContainer
			isColorValueValid={isColorValueValid}
			isNavbarOpen={isNavbarOpen}
		>
			<div className="transparent-background"></div>
			<div className="options">
				<p className="option-description">Wielkość: {lineSize}</p>
				<input
					type="range"
					min={1}
					max={50}
					value={lineSize}
					onChange={e =>
						dispatch(
							updateLineSize({
								value: parseInt(e.target.value),
							})
						)
					}
				/>
				<p className="option-description">
					Kolor: {lineColor}
					{!isColorValueValid &&
						", Podałeś złą wartość (Należy podać kod HEX np: #00ff00)"}
				</p>
				<ColorInputContainer isValueValid={isColorValueValid}>
					<i
						className="icon-container"
						onClick={() => dispatch(toggleEraser())}
					>
						{isEraserEnabled ? <BsEraserFill /> : <BsEraser />}
					</i>
					<input
						type="text"
						className="color-input"
						placeholder="Wpisz kod koloru (HEX):"
						value={inputColorValue}
						onChange={e => setInputColorValue(e.target.value)}
					/>
					<button
						onClick={() =>
							dispatch(
								updateLineColor({ value: inputColorValue })
							)
						}
						className="submit-color-button"
					>
						Zatwierdź
					</button>
				</ColorInputContainer>
				<p className="option-description">
					Kolor płótna: {canvasBackgroundColor}
					{!isCanvasBackgroundColorValueValid &&
						", Podałeś złą wartość (Należy podać kod HEX np: #00ff00)"}
				</p>
				<ColorInputContainer
					isValueValid={isCanvasBackgroundColorValueValid}
				>
					<i
						className="icon-container"
						onClick={() => dispatch(clearCanvas({ ctx }))}
					>
						<ImBin />
					</i>
					<input
						type="text"
						className="color-input"
						placeholder="Wpisz kod koloru (HEX):"
						value={inputCanvasColorValue}
						onChange={e => setInputCanvasColorValue(e.target.value)}
					/>
					<button
						onClick={() =>
							dispatch(
								updateCanvasBackgroundColor({
									value: inputCanvasColorValue,
								})
							)
						}
						className="submit-color-button"
					>
						Zatwierdź
					</button>
				</ColorInputContainer>
				<p className="option-description">Wybierz tło:</p>
				<select className="select-background">
					{backgroundOptions.map((backgroundOption, index) => (
						<option
							key={index}
							value={backgroundOption.color}
							onClick={() => {
								dispatch(
									setBackgroundColor({
										value: backgroundOption.color,
									})
								)
								localStorage.removeItem("user-background")
								localStorage.setItem(
									"user-background",
									backgroundOption.color
								)
							}}
						>
							{backgroundOption.title}
						</option>
					))}
				</select>
				<p className="option-description">
					Narzędzie: {userToolTypeName}
				</p>
				<div className="tools-container">
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "BRUSH",
									figureMode: "STROKE",
									toolName: "Pędzel",
								})
							)
						}
					>
						<IoIosBrush />
					</i>
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "LINE",
									figureMode: "STROKE",
									toolName: "Linia",
								})
							)
						}
					>
						<HiOutlineMinus />
					</i>
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "RECT",
									figureMode: "FILL",
									toolName: "Pełny prostokąt",
								})
							)
						}
					>
						<IoMdSquare />
					</i>
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "RECT",
									figureMode: "STROKE",
									toolName: "Pusty Prostokąt",
								})
							)
						}
					>
						<IoMdSquareOutline />
					</i>
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "CIRCLE",
									figureMode: "FILL",
									toolName: "Kóło",
								})
							)
						}
					>
						<BsCircleFill />
					</i>
					<i
						className="tool"
						onClick={() =>
							dispatch(
								changeTool({
									toolType: "CIRCLE",
									figureMode: "STROKE",
									toolName: "Okrąg",
								})
							)
						}
					>
						<BsCircle />
					</i>
				</div>
			</div>
		</AppOptionsContainer>
	)
}
