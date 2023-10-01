import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ApiResponse, RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Octicons";
import CurrencyTile from "../components/CurrencyTile";
import { Country } from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DigitsPad from "../components/DigitsPad";
import { appState, toastType } from "../enums";
import axios from "axios";
import apiEndpoints from "../config/api-endpoints";
import { getErrorMessage, showToast } from "../utils/helpers";
import { API_KEY } from "@env";

type Props = StackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [fromCountry, setFromCountry] = React.useState<Country>({
		cca2: "US",
		currency: ["USD"],
		callingCode: ["1"],
		region: "Americas",
		subregion: "North America",
		flag: "flag-us",
		name: "United States",
	});
	const [toCountry, setToCountry] = React.useState<Country>({
		callingCode: ["234"],
		cca2: "NG",
		currency: ["NGN"],
		flag: "flag-ng",
		name: "Nigeria",
		region: "Africa",
		subregion: "Western Africa",
	});
	const [fromAmount, setFromAmount] = React.useState<string>("");
	const [currentState, setCurrentState] = React.useState<appState>(appState.IDLE);
	const [apiData, setApiData] = React.useState<ApiResponse>();

	const isDisabled: boolean =
		!fromCountry ||
		Object.values(fromCountry).length === 0 ||
		!toCountry ||
		Object.values(toCountry).length === 0 ||
		!fromAmount;

	const onReset = () => {
		setFromAmount("");
		setApiData(undefined);
	};

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

	const fetchExchangeRate = async () => {
		if (isDisabled) return;
		setCurrentState(appState.LOADING);
		try {
			const response = await axios.get(apiEndpoints.getExchangeRate, {
				params: {
					from: fromCountry.currency[0],
					to: toCountry.currency[0],
					amount: Number(fromAmount),
				},
				headers: {
					apikey: API_KEY,
				},
			});
			const { status, data } = response || {};
			if (status === 200) {
				setCurrentState(appState.SUCCESS);
				setApiData(data);
			}
		} catch (err) {
			setCurrentState(appState.ERROR);
			showToast(getErrorMessage(err), toastType.ERROR);
		}
	};

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
					<Text style={styles.result}>
						{apiData && Object.values(apiData).length > 0
							? `${apiData.query.amount} ${apiData.query.from} = ${apiData.result.toFixed(2)} ${
									apiData.query.to
							  }`
							: "Select currencies and convert"}
					</Text>
				</View>
				<View style={styles.contents}>
					<CurrencyTile
						text={fromAmount}
						defaultCountryCode="US"
						onSelect={(country) => {
							onReset();
							setFromCountry(country);
						}}
					/>
					<View style={styles.divider} />
					<CurrencyTile
						text={apiData?.result.toFixed(2) || ""}
						defaultCountryCode="NG"
						onSelect={(country) => {
							onReset();
							setToCountry(country);
						}}
					/>
				</View>
			</KeyboardAwareScrollView>
			<DigitsPad
				text={fromAmount}
				isDisabled={isDisabled}
				isLoading={currentState === appState.LOADING}
				onDigitPress={(text: string) => setFromAmount(fromAmount.concat(text))}
				onClear={onReset}
				onRemove={() => {
					const updatedInput = fromAmount.slice(0, -1);
					setFromAmount(updatedInput);
				}}
				onSubmit={fetchExchangeRate}
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
			maxWidth: "85%",
			alignSelf: "center",
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
