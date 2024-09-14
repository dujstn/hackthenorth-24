import {StyleSheet, Text, View} from "react-native";

export default function Index(){
	return (
	<View style={styles.container}>
		<Text style={styles.header}>
			I love HTN 2024 
		</Text>
	</View>
	);
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems : "center",
	},
	header: {
		fontSize: 32,
		color: "blue",
	}
})