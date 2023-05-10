// import { Coordinate, GameBounds } from "../types/types";

// export const checkGameOver = (
// 	snakeHead: Coordinate,
// 	boundaries: GameBounds,
// 	wall: Coordinate[],
// 	wallBis: Coordinate[]
// ): boolean => {
// 	// TODO : function to not repeat myself here

// 	function snakeTouchingWall (wall: Coordinate[], snakeHead: Coordinate) {
// 		return wall.some((wallPiece) => {
// 		return wallPiece.x === snakeHead.x && wallPiece.y === snakeHead.y;
// 	});
// 	}
// const isTouchingWall = snakeTouchingWall(wall, snakeHead);
// const isTouchingWallBis = snakeTouchingWall(wallBis, snakeHead);

// 	return (
// 		snakeHead.x > boundaries.xMax ||
// 		snakeHead.x < boundaries.xMin ||
// 		snakeHead.y > boundaries.yMax ||
// 		snakeHead.y < boundaries.yMin ||
// 		isTouchingWall ||
// 		isTouchingWallBis
// 	);
// };

import { Coordinate, GameBounds } from "../types/types";

export const checkGameOver = (
	snakeHead: Coordinate,
	boundaries: GameBounds,
	allWalls: Coordinate[][]
): boolean => {
function isTouchingWall(snakeHead: Coordinate, allWalls: Coordinate[][]): boolean {
	for (const wall of allWalls) {
		for (const coordinate of wall) {
			if (snakeHead.x === coordinate.x && snakeHead.y === coordinate.y) {
				return true;
			}
		}
	}
	return false;
}
	return (
		snakeHead.x > boundaries.xMax ||
		snakeHead.x < boundaries.xMin ||
		snakeHead.y > boundaries.yMax ||
		snakeHead.y < boundaries.yMin ||
		isTouchingWall(snakeHead, allWalls)
	);
};
