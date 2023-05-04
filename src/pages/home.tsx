import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function HomeScreen({ navigation }: any) {
	const handleLevelPress = (level: number) => {
		console.log('dans homme',level)
		navigation.navigate("Game", { level: level });
	};
	const goTo = () => navigation.navigate("Details");

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Snake 🐍</Text>
			<TouchableOpacity onPress={() => handleLevelPress(0)} style={styles.button}>
				<Text style={styles.buttonText}>Beginner</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLevelPress(50)} style={styles.button}>
				<Text style={styles.buttonText}>Confirmed</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLevelPress(70)} style={styles.button}>
				<Text style={styles.buttonText}>Expert</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={goTo} style={styles.button}>
				<Text style={styles.buttonText}>Détails</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2E8B57",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 39,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 78,
	},
	subtitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 30,
		minWidth: 150,
		marginBottom: 10,
	},
	buttonText: {
		color: "#2E8B57",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default HomeScreen;
