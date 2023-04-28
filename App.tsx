import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

import HomeScreen from "./src/pages/home";
import About from "./src/pages/about";
import Game from "./src/components/Game";

const Stack = createNativeStackNavigator();''

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					headerStyle: {
						backgroundColor: "#2E8B57",
					},
				}}
			>
				<Stack.Screen name="Home">
					{(props) => <HomeScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="Details" component={About} />
				<Stack.Screen
					name="Game"
					component={Game}
					// options={{
					// 	headerLeft: () => (
					// 		<Button onPress={() => navigation.navigate("Home")} title="Menu" />
					// 	),
					// }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
