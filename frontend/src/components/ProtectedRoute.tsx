import useAuthContext from "../hooks/useAuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoute = () => {
	const { auth } = useAuthContext()
	const location = useLocation()
	if (!auth) {	
		return <Navigate to={"/login"} state={{from: location}} replace	 />
	} else return <Outlet />
}

export default ProtectedRoute
