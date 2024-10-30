import { useState } from 'react'
import Section from '../../components/section'
import useAuthContext from '../../hooks/useAuthContext'
import BuyForm from './form/buy'
import SellForm from './form/sell'

import './index.css'

const TradePage = () => {
	const { auth } = useAuthContext()
	const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
	const toggleTradeType = () => setTradeType(tradeType === 'sell' ? 'buy' : 'sell')
	return (
		<Section className="trade-section">
			<h1>Trade</h1>
			{auth && (
				<div>
					<button onClick={toggleTradeType} disabled={tradeType === 'sell'}>
						Sell
					</button>
					<button onClick={toggleTradeType} disabled={tradeType === 'buy'}>
						Buy
					</button>
				</div>
			)}
			{tradeType === 'buy' ? <BuyForm /> : <SellForm />}
		</Section>
	)
}

export default TradePage
