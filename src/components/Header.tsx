import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../styles/colors";

interface HeaderProps {
	reloadGame: () => void;
	pauseGame: () => void;
	children: JSX.Element;
	isPaused: boolean;
}

export default function Header({
	children,
	reloadGame,
	pauseGame,
	isPaused,
}: HeaderProps) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={reloadGame}>
				<Ionicons name="reload-circle" size={35} color={Colors.primary} />
			</TouchableOpacity>
			{children}
			<TouchableOpacity onPress={pauseGame}>
				<FontAwesome size={35} name={isPaused ? "play-circle" : "pause-circle"} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.05,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: Colors.primary,
		borderWidth: 12,
		borderTopLeftRadius: 29,
		borderTopRightRadius: 29,
		borderBottomWidth: 0,
		padding: 15,
		backgroundColor: Colors.background,
	},
});
