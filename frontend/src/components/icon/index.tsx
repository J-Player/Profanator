import React, { ElementType } from "react"

import { attrNormalize } from "./helpers.ts"
import icons from "./icons.json"

type GenericObject = { [key: string]: any }

interface ChildProps {
	key?: string | number
	name: ElementType | string
	attributes?: GenericObject
	children?: [GenericObject] | GenericObject
	width: number
}

const Child = ({ name: Element, attributes, children, ...props }: ChildProps) => {
	return (
		<Element {...attrNormalize(attributes)} {...props}>
			{children?.length && children.map((child: ChildProps, key: number) => <Child key={key} {...child} />)}
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

export const Icon = ({ name, width, ...props }: IconProps): JSX.Element => <Child {...props} {...icons[name]} width={width || 24} />
