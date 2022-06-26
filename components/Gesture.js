import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { runOnJS, set, useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated";
import { checkPluginState } from "react-native-reanimated/lib/reanimated2/core";
import { canvas2Polar, Vector } from "react-native-redash";
import * as Haptics from 'expo-haptics';

import { CENTER, containedInSquare, normalize, STROKE, TAU } from "./Constants";
import CursorOverlay from './CursorOverlay';

const LINES = 75;
const DELTA = TAU / LINES;
console.log(DELTA)

const Gesture = (props) => {
	const [hapticHeavy, setHapticHeavy] = useState(false);
	const [hapticMeadium, setHapticMedium] = useState(false);
	const [hapticLight, setHapticLight] = useState(false);
	useEffect(() => {
		if (hapticHeavy) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
			setHapticHeavy(false)
		} else if (hapticMeadium) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			setHapticMedium(false)
		} else if (hapticLight) {
			console.log("LIGHT")
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
			setHapticLight(false)
		}
	}, [hapticHeavy, hapticMeadium, setHapticHeavy, setHapticMedium])

	const handler = useAnimatedGestureHandler({
		onStart: (event, ctx) => {
			"worklet"
			const value = {x: event.x, y: event.y};
			if (containedInSquare(value, props.startPos.value, STROKE)) {
				ctx.region = 0;
				ctx.offset = props.start.value;
			} else if (containedInSquare(value, props.endPos.value, STROKE)) {
				ctx.region = 1;
				ctx.offset = props.end.value;
			} else {
				ctx.region = 2;
				const { theta } = canvas2Polar(value, CENTER);
				ctx.offset = theta;
			}
			ctx.currentDelta = 0;
		},
		onActive: (event, ctx) => {
			"worklet"
			const {theta} = canvas2Polar({x: event.x, y: event.y}, CENTER);;
			const delta = theta - ctx.offset;
			if (ctx.region === 0 || ctx.region === 2) {
				props.start.value = normalize(props.start.value + delta);
			}
			if (ctx.region === 1 || ctx.region === 2) {
				props.end.value = normalize(props.end.value + delta);
			}
			ctx.offset = theta;
			ctx.currentDelta = ctx.currentDelta + delta;
			console.log(DELTA, ctx.currentDelta)
			if (Math.abs(ctx.currentDelta) > DELTA) {
				ctx.currentDelta = 0;
				runOnJS(setHapticMedium)(true);
			}
		}
	})

	return (
		<PanGestureHandler onGestureEvent={handler}>
			<Animated.View style={StyleSheet.absoluteFill}>
				<CursorOverlay position={props.startPos} icon="bed" />
				<CursorOverlay position={props.endPos} icon="bell" />
			</Animated.View>
		</PanGestureHandler>
	);
}

export default Gesture;