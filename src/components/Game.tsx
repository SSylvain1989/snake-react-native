import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
	const [direction, setDirection] = useState<Direction>(Direction.Right);
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	useEffect(() => {
		if (!isGameOver) {
			const intervalId = setInterval(() => {
				!isPaused && moveSnake();
			}, MOVE_INTERVAL);
			return () => clearInterval(intervalId);
		}
	}, [snake, isGameOver, isPaused]);

	const moveSnake = () => {
		const snakeHead = snake[0];
		const newHead = { ...snakeHead }; // create copy, we will move the new one, not move the real head

		// game over
		if (checkGameOver(snakeHead, GAME_BOUNDS)) {
			setIsGameOver((prev) => !prev); // we doing this to not wait the recreation of the component 
			return; // return here prevent to go much down in the code execution
		}
			switch (direction) {
				case Direction.Up:
					newHead.y -= 1;
					break;
				case Direction.Down:
					newHead.y += 1;
					break;
				case Direction.Left:
					newHead.x -= 1;
					break;
				case Direction.Right:
					newHead.x += 1;
					break;
				default:
					break;
			}
		// if eat food
		// grow snake
		setSnake([newHead, ...snake.slice(0, -1)]);
	};
	console.log("x", snake[0].x);
	console.log("y", snake[0].y);
	console.log(isGameOver);
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
		console.log("translationX:", translationX, "translationY", translationY);
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
	},
});
