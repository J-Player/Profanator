import { createGlobalStyle } from "styled-components"

import barlow from "../assets/fonts/barlow_medium.woff2"
import d_din from "../assets/fonts/d-din.woff2"
import profane from "../assets/fonts/profane.woff2"

type FontType = "barlow" | "d_din" | "profane"

type Font = {
	name: FontType
	src: string
	format: "woff2"
}

export const FONTS: Record<FontType, Font> = {
	barlow: { name: "barlow", src: barlow, format: "woff2" },
	d_din: { name: "d_din", src: d_din, format: "woff2" },
	profane: { name: "profane", src: profane, format: "woff2" },
}

export const GlobalStyle = createGlobalStyle`

@font-face {
	font-family: ${FONTS.barlow.name};
	src: url(${FONTS.barlow.src}) format(${FONTS.barlow.format});
}

@font-face {
	font-family: ${FONTS.d_din.name};
	src: url(${FONTS.d_din.src}) format(${FONTS.d_din.format});
}

@font-face {
	font-family: ${FONTS.profane.name};
	src: url(${FONTS.profane.src}) format(${FONTS.profane.format});
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
	font-family: ${FONTS.profane.name};
}

body {
	background-color: black;
	background-image: url('bg.jpg');
	background-attachment: fixed;
	background-size: cover;
	backdrop-filter: grayscale(50%) brightness(.5);
	font-size: 62.5%;
	font-family: ${FONTS.barlow.name};
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

`
