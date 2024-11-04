import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Main from './components/main'
import Header from './components/header'
import Button from './components/button'
import Footer from './components/Footer'
import { Icon } from './components/icon'

const App = () => {
	const [showButton, setShowButton] = useState(false)

	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [pathname])

	useEffect(() => {
		const listener = () => {
			setShowButton(window.scrollY !== 0)
		}
		addEventListener('scroll', listener)
		return () => removeEventListener('scroll', listener)
	}, [])

	return (
		<div className="relative flex flex-col items-center">
			<Header />
			<Main>
				<Outlet />
			</Main>
			{showButton && (
				<Button
					className="sticky bottom-4 right-4 mb-4 size-12 cursor-pointer self-end rounded-full border-2"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<Icon className="m-auto" name="arrow-up" />
				</Button>
			)}
			<Footer />
		</div>
	)
}

export default App
