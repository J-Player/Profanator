import { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const useAppContext = () => {
	const context = useContext(AppContext)
	if (context) return context
	else throw new Error("Context 'AppContext' not found!")
}

export default useAppContext
