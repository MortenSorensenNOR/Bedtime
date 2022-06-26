import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { formatDuration, radToMinutes } from "./Constants";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	row: {
		color: "#9D9EA7",
	},
	time: {
		color: "white",
		fontSize: 24,
		fontWeight: "600",
	},
	label: {
		fontSize: 14,
		fontWieght: "600",
	},
});

const Label = (props) => {
	const time = useDerivedValue(() => {
		const minutes = radToMinutes(props.theta.value);
		return formatDuration(minutes);
	});
	return (
		<View style={styles.container}>
			<Text style={styles.row}>
				<Icon name={props.icon} size={16} />
				<Text style={styles.label}>{"\u00A0" + props.label}</Text>
			</Text>
			<ReText style={styles.time} text={time} />
		</View>
	);
};

export default Label;