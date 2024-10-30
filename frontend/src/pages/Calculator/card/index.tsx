import { HTMLAttributes, useState } from 'react'
import Item from '../../../models/Item'
import { cn } from '../../../utils/cn'
import { Icon } from '../../../components/icon'

import './index.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	item: Item
}

export const Card = ({ className, item, ...props }: CardProps) => {
	const { name, quantity, restQt, ingredients } = item
	const [show, setShow] = useState(false)
	const toggleShow = () => setShow(!show)
	return (
		<div className={cn('item', className)} {...props}>
			<div className={ingredients && 'cursor-pointer'} onClick={toggleShow} onFocus={e => e.target.blur()}>
				{ingredients && <Icon name={show ? 'arrow-up' : 'arrow-down'} width={16} />}
				<img
					src={`items/${name.toLowerCase().replace(' ', '_')}.png`}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null
						currentTarget.src = 'items/ambar.png'
					}}
					alt=""
				/>
				<span>
					{name} x {quantity}
					{restQt && ` [Rest: ${restQt}]`}
				</span>
			</div>
			{!show && ingredients && (
				<div className="ingredients">
					{ingredients.map((value, index) => {
						return <Card item={value} key={index} />
					})}
				</div>
			)}
		</div>
	)
}
