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

type Props = {
	text: string;
	isDisabled: boolean;
	isLoading: boolean;
	onDigitPress: (text: string) => void;
	onClear: () => void;
	onRemove: () => void;
	onSubmit: () => void;
};

const { height, width } = Dimensions.get("window");
const keySize = width * 0.2;
const keyTextSize = keySize / 3;
const keyGap = keySize * 0.2;

export default function DigitsPad({
	text,
	isDisabled,
	isLoading,
	onDigitPress,
	onClear,
	onRemove,
	onSubmit,
}: Props) {
	const { styles, theme } = useStyles(createStyles);
	const inset = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: inset.bottom }]}>
			<View style={styles.row}>
				<DigitButton onPress={() => onDigitPress("7")} digit="7" />
				<DigitButton onPress={() => onDigitPress("8")} digit="8" />
				<DigitButton onPress={() => onDigitPress("9")} digit="9" />
				<DigitButton onPress={onClear}>
					<Icon name="trash-outline" color={theme.green} size={30} />
				</DigitButton>
			</View>
			<View style={styles.row}>
				<DigitButton onPress={() => onDigitPress("4")} digit="4" />
				<DigitButton onPress={() => onDigitPress("5")} digit="5" />
				<DigitButton onPress={() => onDigitPress("6")} digit="6" />
				<DigitButton onPress={onRemove}>
					<Icon name="arrow-back" color={theme.green} size={30} />
				</DigitButton>
			</View>
			<View style={styles.row}>
				<DigitButton onPress={() => onDigitPress("1")} digit="1" />
				<DigitButton onPress={() => onDigitPress("2")} digit="2" />
				<DigitButton onPress={() => onDigitPress("3")} digit="3" />
				<DigitButton
					onPress={() => {
						if (text.length < 1 || text.includes(".")) return;
						onDigitPress(".");
					}}
					digit="&#xb7;"
				/>
			</View>
			<View style={[styles.row, { alignItems: "center" }]}>
				<DigitButton
					onPress={() => {
						// if (text.length < 1) return;
						onDigitPress("0");
					}}
					digit="0"
				/>
				<CustomButton
					disabled={isDisabled}
					isLoading={isLoading}
					label="Convert"
					style={{ flex: 1 }}
					onPress={onSubmit}
				/>
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
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	children?: JSX.Element;
}) => {
	const { styles } = useStyles(createStyles);

	return (
		<TouchableOpacity style={[styles.digitButton, style]} onPress={onPress}>
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
		},
		digitButtonText: {
			fontSize: keyTextSize,
		},
	});
