import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	$primary?: boolean
}

const Button = ({ className, children, $primary, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(
				'bg-light-gray px-2 py-1 border border-dark-blue outline-none disabled:cursor-not-allowed disabled:opacity-50  [&:not(:disabled)]:hover:bg-whitesmoke rounded',
				$primary &&
					'bg-dark-blue text-light-gray [&:not(:disabled)]:hover:bg-orange [&:not(:disabled)]:hover:text-dark-blue',
				className
			)}
			{...props}>
			{children}
		</button>
	)
}

export default Button
