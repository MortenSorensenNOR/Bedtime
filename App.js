import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CircularSlider from './components/CircularSlider';
import { PADDING, PI } from './components/Constants';
import Container from './components/Container';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1c1b1d',
		padding: PADDING,
	},
	title: {
		fontWeight: '600',
		fontSize: 36,
		color: "white",
		marginBottom: 32
	},
});

const Bedtime = () => {
	const start = useSharedValue(PI / 2);
	const end = useSharedValue(1.5 * Math.PI);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Next Wake Up Only</Text>
			<Container start={start} end={end}>
				<CircularSlider start={start} end={end} />
			</Container>
		</View>
	)
}

export default Bedtime;