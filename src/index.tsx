import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./globals.css"
import { ThemeProvider } from "styled-components"
import { theme } from "./app/theme"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)
