import { createContext, Dispatch, SetStateAction } from 'react'

export type AppType = {
	proficiencies?: string[]
	items?: Map<string, string>
}

type AppContextProp<T> = {
	app: T
	setApp: Dispatch<SetStateAction<T>>
} | null

const AppContext = createContext<AppContextProp<AppType>>(null)

export default AppContext
