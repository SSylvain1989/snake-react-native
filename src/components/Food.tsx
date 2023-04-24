import { StyleSheet, Text, View } from "react-native";
import { Coordinate } from "../types/types";

function getRandomFoodEmoji() {
	const foodEmojis = ["🐇", "🧚", "🦝", "🍣"];
	const randomIndex = Math.floor(Math.random() * foodEmojis.length);
	return foodEmojis[randomIndex];
}

export default function Food({ x, y }: Coordinate): JSX.Element {
	return <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>🍣</Text>;
}

const styles = StyleSheet.create({
	food: {
		width: 18,
		height: 18,
		borderRadius: 7,
		position: "absolute",
	},
});
