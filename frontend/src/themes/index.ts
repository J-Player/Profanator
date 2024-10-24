import 'styled-components'
import { DefaultTheme } from 'styled-components'

export enum Color {
	BLACK = "black",
	DARK_BLUE = "#121F26",
	DARK_GRAY = "#242323",
	GRAY = "gray",
	LIGHT_GRAY = "lightgray",
	ORANGE = "orange",
	WHITE = "white",
	RED = "red",
	TRANSPARENT = "transparent",
}

export interface ITheme {
	primary: Color
	secondary: Color
	background: Color
}

export type ThemeType = "default"

declare module "styled-components" {
	export interface DefaultTheme {
		components: {
			header: ITheme
			main: ITheme
			footer: ITheme
		}
	}
}

export const THEMES: Record<ThemeType, DefaultTheme> = {
	default: {
		components: {
			header: {
				background: Color.DARK_BLUE,
				primary: Color.WHITE,
				secondary: Color.ORANGE,
			},
			main: {
				background: Color.WHITE,
				primary: Color.BLACK,
				secondary: Color.ORANGE,
			},
			footer: {
				background: Color.DARK_GRAY,
				primary: Color.WHITE,
				secondary: Color.ORANGE,
			},
		}
	},
}
