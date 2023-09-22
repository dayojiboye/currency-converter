import {
	Dimensions,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../CustomButton";

const { height, width } = Dimensions.get("window");
const keySize = width * 0.2;
const keyTextSize = keySize / 3;
const keyGap = keySize * 0.2;

export default function DigitsPad() {
	const { styles, theme } = useStyles(createStyles);
	const inset = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: inset.bottom }]}>
			<View style={styles.row}>
				<DigitButton onPress={() => {}} digit="7" />
				<DigitButton onPress={() => {}} digit="8" />
				<DigitButton onPress={() => {}} digit="9" />
				<DigitButton onPress={() => {}}>
					<Icon name="trash-outline" color={theme.green} size={30} />
				</DigitButton>
			</View>
			<View style={styles.row}>
				<DigitButton onPress={() => {}} digit="4" />
				<DigitButton onPress={() => {}} digit="5" />
				<DigitButton onPress={() => {}} digit="6" />
				<DigitButton onPress={() => {}}>
					<Icon name="arrow-back" color={theme.green} size={30} />
				</DigitButton>
			</View>
			<View style={styles.row}>
				<DigitButton onPress={() => {}} digit="1" />
				<DigitButton onPress={() => {}} digit="2" />
				<DigitButton onPress={() => {}} digit="3" />
				<DigitButton onPress={() => {}} digit="." />
			</View>
			<View style={[styles.row, { alignItems: "center" }]}>
				<DigitButton onPress={() => {}} digit="0" />
				<CustomButton label="Convert" style={{ flex: 1 }} />
			</View>
		</View>
	);
}

const DigitButton = ({
	digit,
	onPress,
	style,
	children,
}: {
	digit?: string;
	onPress: (digit: string) => void;
	style?: StyleProp<ViewStyle>;
	children?: JSX.Element;
}) => {
	const { styles, theme } = useStyles(createStyles);

	return (
		<TouchableOpacity style={[styles.digitButton, style]}>
			{digit ? <Text style={styles.digitButtonText}>{digit}</Text> : null}
			{children}
		</TouchableOpacity>
	);
};

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			height: height / 2,
			backgroundColor: theme.background,
			width,
			flexGrow: 0,
			paddingHorizontal: 20,
			gap: keyGap,
			justifyContent: "center",
		},
		row: {
			flexDirection: "row",
			gap: keyGap,
			width: "100%",
			justifyContent: "space-between",
		},
		digitButton: {
			width: keySize,
			height: keySize,
			justifyContent: "center",
			alignItems: "center",
			// backgroundColor: "red",
		},
		digitButtonText: {
			fontSize: keyTextSize,
		},
	});
