import React, { ReactNode, useState, useEffect } from "react";
import { StyleSheet, View, Button } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import { PADDING, formatDuration2, radToMinutes, absoluteDuration } from './Constants';
import Label from './Label';

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#2c2b2d",
		borderRadius: 16,
		padding: PADDING,
		width: "100%",
		justifyContent: 'center',
		alignItems: 'center'
	},
	values: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: "60%",
		marginBottom: 10
	},
	duration: {
		fontWeight: "500",
		fontSize: 24,
		textAlign: 'center',
		marginTop: PADDING,
		color: 'white'
	}
});

const Container = (props) => {
	const duration = useDerivedValue(() => {
		const d = absoluteDuration(props.start.value, props.end.value);
		return formatDuration2(radToMinutes(d));
	});

	return (
		<View style={styles.container}>
			<View style={styles.values}>
				<Label theta={props.start} label="BEDTIME" icon="bed" />
				<Label theta={props.end} label="WAKE UP" icon="bell" />
			</View>
			{props.children}
			<ReText style={styles.duration} text={duration} />
		</View>
	)
}

export default Container;