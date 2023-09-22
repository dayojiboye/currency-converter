import { darkTheme, lightTheme } from "../config/theme";

export type RootStackParamList = {
	Home: undefined;
};

export type AppContextValue = {
	themeMode: string;
	isInitializing: boolean;
	toggleThemeMode: (value: string) => void;
	setInitApp: (value: boolean) => void;
};

export type ThemeType = typeof lightTheme | typeof darkTheme;

export type ApiResponse = {
	date: string;
	historical: boolean;
	info: {
		rate: number;
	};
	motd: {
		msg: string;
		url: string;
	};
	query: {
		amount: number;
		from: string;
		to: string;
	};
	result: number;
	success: boolean;
};
