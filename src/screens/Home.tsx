import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Octicons";
import CurrencyTile from "../components/CurrencyTile";
import { Country } from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DigitsPad from "../components/DigitsPad";

type Props = StackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [fromCountry, setFromCountry] = React.useState<Country>();
	const [toCountry, setToCountry] = React.useState<Country>();
	const [fromAmount, setFromAmount] = React.useState<string>("");
	const [toAmount, setToAmount] = React.useState<string>("");

	React.useEffect(() => {
		navigation.setOptions({
			title: "",
			headerLeft: (props) => (
				<TouchableOpacity>
					<Icon name="graph" color={theme.green} size={25} />
				</TouchableOpacity>
			),
			headerRight: (props) => (
				<TouchableOpacity>
					<Icon name="bookmark" color={theme.green} size={30} />
				</TouchableOpacity>
			),
			headerStyle: { backgroundColor: theme.cream },
		});
	}, [navigation]);

	// React.useEffect(() => {
	// 	console.log(fromAmount);
	// }, [fromAmount]);

	return (
		<>
			<CustomStatusBar />
			<KeyboardAwareScrollView
				style={{ flex: 1, backgroundColor: theme.cream }}
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
				stickyHeaderIndices={[0]}
			>
				<View style={styles.resultContainer}>
					<Text style={styles.result}>1 USD = 1.315 SGD</Text>
				</View>
				<View style={styles.contents}>
					<CurrencyTile text={fromAmount} onSelect={(country) => setFromCountry(country)} />
					<View style={styles.divider} />
					<CurrencyTile
						text={toAmount}
						value={toAmount}
						onSelect={(country) => setToCountry(country)}
					/>
				</View>
			</KeyboardAwareScrollView>
			<DigitsPad
				text={fromAmount}
				onDigitPress={(text: string) => setFromAmount(fromAmount.concat(text))}
				onClear={() => setFromAmount("")}
				onRemove={() => {
					const updatedInput = fromAmount.slice(0, -1);
					setFromAmount(updatedInput);
				}}
			/>
		</>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 20,
			paddingTop: 20,
			paddingBottom: 50,
		},
		resultContainer: {
			backgroundColor: theme.cream,
			paddingVertical: 10,
		},
		result: {
			fontSize: 20,
			color: theme.text,
			fontWeight: "500",
			textAlign: "center",
		},
		contents: {
			marginTop: 48,
		},
		divider: {
			backgroundColor: theme.mute,
			width: "100%",
			height: 2,
		},
	});
