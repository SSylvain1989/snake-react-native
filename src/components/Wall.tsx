import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { Coordinate } from "../types/types";

interface WallProps {
	wall: Coordinate[];
}

export default function Wall({ wall }: WallProps): JSX.Element {
	return (
		<Fragment>
			{wall.map((segment: Coordinate, index: number) => {
				const segmentStyle = {
					left: segment.x * 10,
					top: segment.y * 10,
				};
				return <View key={index} style={[styles.wall, segmentStyle]} />;
			})}
		</Fragment>
	);
}

const styles = StyleSheet.create({
	wall: {
		width: 12,
		height: 11,
		borderRadius: 0,
		backgroundColor: Colors.tertiary,
		position: "absolute",
	},
});
