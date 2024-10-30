import { FormHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type FormProps = FormHTMLAttributes<HTMLFormElement>

export const Form = ({ className, children, ...props }: FormProps) => {
	return (
		<form className={cn('flex flex-col gap-4', className)} {...props}>
			{children}
		</form>
	)
}

export default Form
