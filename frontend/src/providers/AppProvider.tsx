import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContext from '../contexts/AppContext'
import AuthProvider from './AuthProvider'

type AppProviderProp = {
	children: React.ReactNode
}

const query = new QueryClient()

const AppProvider = ({ children }: AppProviderProp) => {
	return (
		<QueryClientProvider client={query}>
			<AppContext.Provider value={null}>
				<AuthProvider>{children}</AuthProvider>
			</AppContext.Provider>
		</QueryClientProvider>
	)
}

export default AppProvider
