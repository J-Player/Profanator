import { useState } from "react"
import AppContext from "../contexts/AppContext"
import AuthProvider from "./AuthProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type AppProviderProp = {
	children: React.ReactNode
}

const query = new QueryClient()

const AppProvider = ({ children }: AppProviderProp) => {
	const [app, setApp] = useState(null)
	return (
		<QueryClientProvider client={query}>
			<AppContext.Provider value={{ app, setApp }}>
				<AuthProvider>{children}</AuthProvider>
			</AppContext.Provider>
		</QueryClientProvider>
	)
}

export default AppProvider
