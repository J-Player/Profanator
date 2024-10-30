import { useContext } from 'react'
import TradeContext from '../contexts/TradeContext'

const useTradeContext = () => {
	const context = useContext(TradeContext)
	if (context) return context
	else throw new Error("Context 'TradeContext' not found!")
}

export default useTradeContext
