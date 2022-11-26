import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ToolTypes = {
	BRUSH: "BRUSH"
	LINE: "LINE"
	RECT: "RECT"
	CIRCLE: "CIRCLE"
}
type ToolType = "BRUSH" | "LINE" | "RECT" | "CIRCLE"

type InitialState = {
	isUserDrawing: boolean
	isNavbarOpen: boolean
	lineSize: number
	lineColor: string
	canvasBackgroundColor: string
	isColorValueValid: boolean
	isCanvasBackgroundColorValueValid: boolean
	isEraserEnabled: boolean
	backgroundOptions: {
		title: string
		color: string
	}[]
	toolTypes: ToolTypes
	userToolType: ToolType
	userToolTypeName: string
	userFigureMode: "STROKE" | "FILL"
	userBackgroundColor: string
	userStartingPositions: {
		x: number
		y: number
	}
}

const initialState: InitialState = {
	isUserDrawing: false,
	isNavbarOpen: false,
	lineSize: 5,
	lineColor: "#000",
	canvasBackgroundColor: "#fff",
	isColorValueValid: true,
	isCanvasBackgroundColorValueValid: true,
	isEraserEnabled: false,
	backgroundOptions: [
		{
			title: "Niebiesko-zielony",
			color: "linear-gradient(160deg, #0093e9 0%, #80d0c7 100%)",
		},
		{ title: "Jasnoszary", color: "#898989" },
		{
			title: "Limonkowy",
			color: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
		},
		{
			title: "Różowy",
			color: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
		},
		{
			title: "Granatowy",
			color: "linear-gradient(to right, #1e3c72, #2a5298)",
		},
	],
	toolTypes: {
		BRUSH: "BRUSH",
		LINE: "LINE",
		RECT: "RECT",
		CIRCLE: "CIRCLE",
	},
	userToolType: "BRUSH",
	userToolTypeName: "Pędzęl",
	userFigureMode: "FILL",
	userBackgroundColor: "",
	userStartingPositions: {
		x: 0,
		y: 0,
	},
}

export const drawingAppSlice = createSlice({
	name: "drawingApp",
	initialState,
	reducers: {
		toggleIsNavbarOpen: state => {
			if (!state.isNavbarOpen) {
				state.isColorValueValid = true
				state.isCanvasBackgroundColorValueValid = true
			}

			state.isUserDrawing = false
			state.isNavbarOpen = !state.isNavbarOpen
		},
		toggleEraser: state => {
			state.isEraserEnabled = !state.isEraserEnabled
		},
		updateLineSize: (state, action: PayloadAction<{ value: number }>) => {
			state.lineSize = action.payload.value
		},
		updateLineColor: (state, action: PayloadAction<{ value: string }>) => {
			const validHexColorRegex =
				/#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g
			if (!validHexColorRegex.test(action.payload.value)) {
				state.isColorValueValid = false
				return
			}
			state.isColorValueValid = true
			state.lineColor = action.payload.value
		},
		updateCanvasBackgroundColor: (
			state,
			action: PayloadAction<{ value: string }>
		) => {
			const validHexColorRegex =
				/#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g
			if (!validHexColorRegex.test(action.payload.value)) {
				state.isCanvasBackgroundColorValueValid = false
				return
			}
			state.isCanvasBackgroundColorValueValid = true
			state.canvasBackgroundColor = action.payload.value
		},
		setBackgroundColor: (
			state,
			action: PayloadAction<{ value: string }>
		) => {
			state.userBackgroundColor = action.payload.value
		},
		startDrawing: (
			state,
			action: PayloadAction<{
				ctx: CanvasRenderingContext2D
				helperCtx: CanvasRenderingContext2D
				x: number
				y: number
			}>
		) => {
			const ctx = action.payload.ctx
			const helperCtx = action.payload.helperCtx
			const x = action.payload.x
			const y = action.payload.y

			state.userStartingPositions.x = x
			state.userStartingPositions.y = y
			state.isUserDrawing = true

			ctx.beginPath()
			ctx.lineCap = "round"
			ctx.lineJoin = "round"
			ctx.strokeStyle = state.lineColor
			ctx.lineWidth = state.lineSize
			ctx.globalCompositeOperation = "source-over"

			helperCtx.beginPath()
			helperCtx.lineCap = "round"
			helperCtx.lineJoin = "round"
			helperCtx.strokeStyle = state.lineColor
			helperCtx.lineWidth = state.lineSize
			helperCtx.globalCompositeOperation = "source-over"

			if (state.isEraserEnabled) {
				ctx.globalCompositeOperation = "destination-out"
				helperCtx.strokeStyle = state.canvasBackgroundColor
				helperCtx.fillStyle = state.canvasBackgroundColor
			}

			if (state.userToolType !== "CIRCLE") {
				ctx.moveTo(x, y)
				helperCtx.moveTo(x, y)
			}
		},
		draw: (
			state,
			action: PayloadAction<{
				ctx: CanvasRenderingContext2D
				helperCtx: CanvasRenderingContext2D
				x: number
				y: number
			}>
		) => {
			if (!state.isUserDrawing) return

			const ctx = action.payload.ctx
			const helperCtx = action.payload.helperCtx
			const x = action.payload.x
			const y = action.payload.y

			helperCtx.clearRect(
				0,
				0,
				helperCtx.canvas.width,
				helperCtx.canvas.height
			)

			if (state.userToolType === state.toolTypes.BRUSH) {
				ctx.lineTo(x, y)
				ctx.stroke()

				return
			}

			if (state.userToolType === state.toolTypes.LINE) {
				helperCtx.lineTo(x, y)
				helperCtx.stroke()

				helperCtx.beginPath()
				if (state.isEraserEnabled) {
					helperCtx.strokeStyle = state.canvasBackgroundColor
				}

				helperCtx.moveTo(
					state.userStartingPositions.x,
					state.userStartingPositions.y
				)

				return
			}

			if (state.userToolType === state.toolTypes.RECT) {
				if (state.userFigureMode === "FILL") {
					helperCtx.fillRect(
						state.userStartingPositions.x,
						state.userStartingPositions.y,
						x - state.userStartingPositions.x,
						y - state.userStartingPositions.y
					)
				} else if (state.userFigureMode === "STROKE") {
					helperCtx.strokeRect(
						state.userStartingPositions.x,
						state.userStartingPositions.y,
						x - state.userStartingPositions.x,
						y - state.userStartingPositions.y
					)
				}

				return
			}

			if (state.userToolType === state.toolTypes.CIRCLE) {
				// const startingX = state.userStartingPositions.x
				// const startingY = state.userStartingPositions.y
				const circleSize = Math.sqrt(
					Math.pow(Math.abs(x - state.userStartingPositions.x), 2) +
						Math.pow(Math.abs(y - state.userStartingPositions.y), 2)
				)

				helperCtx.arc(
					state.userStartingPositions.x,
					state.userStartingPositions.y,
					circleSize,
					0,
					Math.PI * 2
				)
				if (state.userFigureMode === "FILL") {
					helperCtx.fill()
				} else if (state.userFigureMode === "STROKE") {
					helperCtx.stroke()
				}
				helperCtx.beginPath()

				return
			}
		},
		finishDrawing: (
			state,
			action: PayloadAction<{
				ctx: CanvasRenderingContext2D
				helperCtx: CanvasRenderingContext2D
				x: number
				y: number
			}>
		) => {
			const ctx = action.payload.ctx
			const helperCtx = action.payload.helperCtx
			const x = action.payload.x
			const y = action.payload.y

			helperCtx.clearRect(
				0,
				0,
				helperCtx.canvas.width,
				helperCtx.canvas.height
			)

			if (state.userToolType === state.toolTypes.LINE) {
				ctx.lineTo(x, y)
				ctx.stroke()
			}

			if (state.userToolType === state.toolTypes.RECT) {
				if (state.userFigureMode === "FILL") {
					ctx.fillRect(
						state.userStartingPositions.x,
						state.userStartingPositions.y,
						x - state.userStartingPositions.x,
						y - state.userStartingPositions.y
					)
				} else if (state.userFigureMode === "STROKE") {
					ctx.strokeRect(
						state.userStartingPositions.x,
						state.userStartingPositions.y,
						x - state.userStartingPositions.x,
						y - state.userStartingPositions.y
					)
				}
			}
			if (state.userToolType === state.toolTypes.CIRCLE) {
				const circleSize = Math.sqrt(
					Math.pow(Math.abs(x - state.userStartingPositions.x), 2) +
						Math.pow(Math.abs(y - state.userStartingPositions.y), 2)
				)

				ctx.arc(
					state.userStartingPositions.x,
					state.userStartingPositions.y,
					circleSize,
					0,
					Math.PI * 2
				)
				if (state.userFigureMode === "FILL") {
					ctx.fill()
				} else if (state.userFigureMode === "STROKE") {
					ctx.stroke()
				}
			}

			state.isUserDrawing = false
			ctx.closePath()
			helperCtx.closePath()
		},
		clearCanvas: (
			state,
			action: PayloadAction<{
				ctx: CanvasRenderingContext2D
			}>
		) => {
			const ctx = action.payload.ctx

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		},
		changeTool: (
			state,
			action: PayloadAction<{
				toolType: ToolType
				figureMode: "STROKE" | "FILL"
				toolName: string
			}>
		) => {
			state.userToolType = action.payload.toolType
			state.userFigureMode = action.payload.figureMode
			state.userToolTypeName = action.payload.toolName
		},
	},
})

export const {
	toggleIsNavbarOpen,
	startDrawing,
	draw,
	finishDrawing,
	setBackgroundColor,
	updateLineSize,
	updateLineColor,
	updateCanvasBackgroundColor,
	toggleEraser,
	changeTool,
	clearCanvas,
} = drawingAppSlice.actions

export default drawingAppSlice.reducer

// Hello. I bought Forza horizon 4 premium edition + Forza horizon 5 premium edition in swedish Microsoft store, but after 6 days I got an email, that the game has been refunded, even though I didn't return it. I can't open the game because it says I don't have it. I would like to ask if there is an option to keep the game. My Microsoft account email: rafalhohler@hotmail.com. Thank you in advance
