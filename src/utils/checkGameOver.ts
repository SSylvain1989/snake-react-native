import { Coordinate, GameBounds } from "../types/types";

export const checkGameOver = (
	snakeHead: Coordinate,
	boundaries: GameBounds,
	wall: Coordinate[],
	wallBis: Coordinate[]
): boolean => {
	// TODO : function to not repeat myself here
	const isTouchingWall = wall.some((wallPiece) => {
		return wallPiece.x === snakeHead.x && wallPiece.y === snakeHead.y;
	});
	const isTouchingWallBis = wallBis.some((wallPiece) => {
		return wallPiece.x === snakeHead.x && wallPiece.y === snakeHead.y;
	});
	return (
		snakeHead.x > boundaries.xMax ||
		snakeHead.x < boundaries.xMin ||
		snakeHead.y > boundaries.yMax ||
		snakeHead.y < boundaries.yMin ||
		isTouchingWall ||
		isTouchingWallBis
	);
};
