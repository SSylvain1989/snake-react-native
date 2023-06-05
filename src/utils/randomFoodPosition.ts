import { Coordinate } from "../types/types";

export const randomFoodPosition = (
	maxX: number,
	maxY: number,
	allWalls: Coordinate[][],
	snakePosition: Coordinate[]
) => {
	while (true) {
		const randomFoodPosition = {
			x: Math.floor(Math.random() * maxX),
			y: Math.floor(Math.random() * maxY),
			allWalls,
		};
		const isOnSnake = isTouchingSnake(randomFoodPosition, snakePosition);
		const isOnWall = isTouchingWall(randomFoodPosition, allWalls);
		if (!isOnSnake && !isOnWall) {
			return randomFoodPosition;
		}
	}
};

function isTouchingSnake(
	randomFoodPosition: Coordinate,
	snakePosition: Coordinate[]
): boolean {
	for (const segment of snakePosition) {
		if (
			segment.x === randomFoodPosition.x &&
			segment.y === randomFoodPosition.y
		) {
			return true;
		}
	}
	return false;
}

function isTouchingWall(
	randomFoodPosition: Coordinate,
	walls: Coordinate[][]
): boolean {
	for (const wall of walls) {
		for (const coordinate of wall) {
			if (
				randomFoodPosition.x === coordinate.x &&
				randomFoodPosition.y === coordinate.y
			) {
				return true;
			}
		}
	}
	return false;
}
