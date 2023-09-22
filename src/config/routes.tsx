import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerMode: "screen",
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}
