import { createBrowserRouter } from "react-router-dom"
import App from "../App"

import ProtectedRoute from "../components/ProtectedRoute"

import Home from "../pages/Home"
import Trade from "../pages/Trade"
import Account from "../pages/Account/Account"
import Calculator from "../pages/Calculator/Calculator"
import Economy from "../pages/Economy/Economy"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/trade", element: <Trade /> },
			{ path: "/account", element: <Account /> },
			{ element: <ProtectedRoute />, children: [] },
			{ path: "/calculator", element: <Calculator /> },
			{ path: "/economy", element: <Economy /> },
		],
	},
])

export default router
