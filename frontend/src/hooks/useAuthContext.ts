import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (context) return context
	else throw new Error("Context 'AuthContext' not found!")
}

export default useAuthContext
