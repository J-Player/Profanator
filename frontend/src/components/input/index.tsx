import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, children, ...props }: InputProps, ref) => {
	return (
		<input
			ref={ref}
			{...props}
			className={cn(
				'border-2 border-light-gray outline-none px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 [&:not(:disabled)]:hover:border-orange [&:not(:disabled)]:focus:border-orange',
				className
			)}>
			{children}
		</input>
	)
})

Input.displayName = 'Input'

export default Input
