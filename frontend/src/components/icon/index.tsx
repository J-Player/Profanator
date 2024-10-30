import { ElementType } from 'react'

import { attrNormalize } from './helpers.ts'
import icons from './icons.json'

type GenericObject = { [key: string]: unknown }

interface ChildProps {
	key?: string | number
	name: ElementType | string
	attributes?: GenericObject
	children?: [unknown] | unknown
	width: number
}

const Child = ({ name: Element, attributes, children, ...props }: ChildProps) => {
	return (
		<Element {...attrNormalize(attributes)} {...props}>
			{Array.isArray(children) && children.map((child: ChildProps, key: number) => <Child key={key} {...child} />)}
		</Element>
	)
}

export type IconsNameEnum = keyof typeof icons

export const iconNames = Object.keys(icons)

interface IconProps {
	name: IconsNameEnum
	width?: number
	className?: string
}

export const Icon = ({ name, width, ...props }: IconProps): JSX.Element => (
	<Child {...props} {...icons[name]} width={width || 24} />
)
