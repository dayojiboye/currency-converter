import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";

type Props = {
	onSelect: (country: Country) => void;
} & TextInputProps;

export default function CurrencyTile({ onSelect, ...props }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [countryCode, setCountryCode] = React.useState<CountryCode>("NG");

	return (
		<View style={styles.container}>
			{/* <Text style={styles.amount}>100</Text> */}
			<TextInput
				spellCheck={false}
				placeholder="0"
				placeholderTextColor={theme.fade}
				cursorColor={theme.fade}
				selectionColor={theme.fade}
				style={styles.input}
				keyboardType="numeric"
				{...props}
			/>
			<CountryPicker
				{...{
					countryCode,
					withCountryNameButton: true,
					withCallingCode: false,
					withCurrencyButton: true,
					withFilter: true,
					// containerButtonStyle: { maxWidth: 200 },
					onSelect: (country) => {
						setCountryCode(country.cca2);
						onSelect(country);
					},
				}}
				// visible
			/>
		</View>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			width: "100%",
			paddingVertical: 28,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			gap: 16,
		},
		input: {
			fontWeight: "500",
			fontSize: 32,
			color: theme.text,
			backgroundColor: "transparent",
			width: 100,
			height: 60,
		},
	});
