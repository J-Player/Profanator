import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./routes/router"

import { GlobalStyle } from "./styles/global"
import { ThemeProvider } from "styled-components"
import { THEMES } from "./themes"
import AppProvider from "./providers/AppProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<ThemeProvider theme={THEMES['default']}>
				<GlobalStyle />
				<RouterProvider router={router} />
			</ThemeProvider>
		</AppProvider>
	</React.StrictMode>
)
