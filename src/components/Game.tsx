import { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEeatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";
import Wall from "./Wall";

export default function Game({ route }: any) {
	const difficulty = route.params?.level;
	const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
	const WALL_INITIAL_POSITION: Coordinate[] = [];
	for (let i = 5; i <= 25; i++) {
		WALL_INITIAL_POSITION.push({ x: i, y: 35 });
	}
	const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
	const GAME_BOUNDS = { xMin: 0, xMax: 37, yMin: 0, yMax: 79 };
	const MOVE_INTERVAL = 150 - difficulty;
	const SCORE_INCREMENT = 1;
	const [direction, setDirection] = useState<Direction>(Direction.Right);
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);
	console.log('***', isGameOver)
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
		if (checkGameOver(snakeHead, GAME_BOUNDS, WALL_INITIAL_POSITION)) {
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
		if (checkEatsFood(newHead, food, 1)) {
			setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
			setSnake([newHead, ...snake]);
			setScore(score + SCORE_INCREMENT);
		} else {
			setSnake([newHead, ...snake.slice(0, -1)]);
		}
	};
	const handleGesture = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent;
		if (Math.abs(translationX) > Math.abs(translationY)) {
			if (translationX > 0) {
				setDirection(Direction.Right);
			} else {
				setDirection(Direction.Left);
			}
		} else {
			if (translationY > 0) {
				setDirection(Direction.Down);
			} else {
				setDirection(Direction.Up);
			}
		}
	};

	const reloadGame = () => {
		setDirection(Direction.Right);
		setSnake(SNAKE_INITIAL_POSITION);
		setFood(FOOD_INITIAL_POSITION);
		setIsGameOver(false);
		setIsPaused(false);
		setScore(0);
	};

	const pauseGame = () => {
		setIsPaused(!isPaused);
	};

	return (
		<PanGestureHandler onGestureEvent={handleGesture}>
			<SafeAreaView style={styles.container}>
				<Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
					<Text style={styles.titleText}>score: {score}</Text>
				</Header>

				<View style={styles.boundaries}>
					<Snake snake={snake} />
					<Food x={food.x} y={food.y} />
					{WALL_INITIAL_POSITION.map((position, index) => (
						<Wall key={index} wall={[position]} />
					))}
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
	wall: {
		position: "absolute",
		backgroundColor: "black",
		width: 12,
		height: 11,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
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
