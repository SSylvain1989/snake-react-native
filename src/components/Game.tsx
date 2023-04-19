import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
	const [direction, setDirection] = useState<Direction>(Direction.Right);
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
	const [isGameOver, seIsGameOver] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);

	const handleGesture = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent;
		if (Math.abs(translationX) > Math.abs(translationY)) {
			if (translationX > 0) {
				// moving right 👉
				setDirection(Direction.Right);
			} else {
				// moving left 👈
				setDirection(Direction.Left);
			}
		} else {
			if (translationY > 0) {
				// moving down 👇
				setDirection(Direction.Down);
			} else {
				// moving up 👆
				setDirection(Direction.Up);
			}
		}
		console.log(translationX, translationY);
	};

	return (
		<PanGestureHandler onGestureEvent={handleGesture}>
			<SafeAreaView style={styles.container}>
				<View style={styles.boundaries}>
					<Snake snake={snake} />
				</View>
			</SafeAreaView>
		</PanGestureHandler>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	boundaries: {
		flex: 1,
		borderColor: Colors.primary,
		borderWidth: 12,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: Colors.background,
	}
});
