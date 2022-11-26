type Theme = {
	media: {
		breakpoints: {
			xs: string
			sm: string
			md: string
			lg: string
			xl: string
		}
	}
	colors: {
		mainBlue: string
		error: string
	}
}

export const theme: Theme = {
	media: {
		breakpoints: {
			xs: "0px",
			sm: "600px",
			md: "900px",
			lg: "1200px",
			xl: "1536px",
		},
	},
	colors: {
		mainBlue: "#4169e1",
		error: "#f00",
	},
}
