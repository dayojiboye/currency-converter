import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";

type Props = {
	text: string;
	defaultCountryCode: CountryCode;
	onSelect: (country: Country) => void;
};

export default function CurrencyTile({ text, onSelect, defaultCountryCode, ...props }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [countryCode, setCountryCode] = React.useState<CountryCode>(defaultCountryCode);

	return (
		<View style={styles.container}>
			<Text style={[styles.amount, { color: !text ? theme.fade : theme.text }]}>{text || "0"}</Text>
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
		amount: {
			fontWeight: "500",
			fontSize: 32,
			flex: 0.8,
		},
	});
