import { ThemeType } from "../types";

const commonValues = {
	green: "#81A891",
	white: "#fff",
	disabled: "#949191",
	black: "#000000",
	cream: "#FFFCF3",
	fade: "#ccc",
	mute: "#eee",
	// add more
};

export const lightTheme = {
	...commonValues,
	background: "#fff",
	text: "#000",
};

export const darkTheme = {
	...commonValues,
	background: "rgb(0, 0, 0)",
	text: "#fff",
};

const themeConfig = (value: string): ThemeType => {
	if (value === "dark") {
		return darkTheme;
	} else {
		return lightTheme;
	}
};

export default themeConfig;
