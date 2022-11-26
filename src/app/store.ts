import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import drawingAppReducer from "../features/drawingApp/drawingAppSlice"

export const store = configureStore({
	reducer: { drawingApp: drawingAppReducer },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
