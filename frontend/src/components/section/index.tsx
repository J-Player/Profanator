import { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import './index.css'

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children: React.ReactNode
}

export default function Section({ className, children, ...props }: SectionProps) {
	return (
		<section className={cn('flex flex-col w-full h-full', className)} {...props}>
			{children}
		</section>
	)
}
