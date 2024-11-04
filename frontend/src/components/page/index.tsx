import React from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Section from '../section'

interface PageProps extends React.HTMLAttributes<HTMLElement> {
	title?: string
}

export const Page = ({ title, children, ...props }: PageProps) => {
	const titlePrefix = 'Profanator'
	useDocumentTitle(title ? `${titlePrefix} - ${title}` : titlePrefix)
	return <Section {...props}>{children}</Section>
}
