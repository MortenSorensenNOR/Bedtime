import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import { Circle } from "react-native-svg";

import { STROKE, R, CENTER } from "./Constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Cursor = (props) => {
	const animatedProps = useAnimatedProps(() => ({cx: props.pos.value.x, cy: props.pos.value.y, r: STROKE / 2}))
	return (
		<AnimatedCircle animatedProps={animatedProps} fill="#fd9f07" />
	);
}

export default Cursor;