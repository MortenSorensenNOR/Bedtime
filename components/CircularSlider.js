import React from "react";
import { View } from 'react-native';
import Animated, { abs, useAnimatedProps, useDerivedValue } from "react-native-reanimated";
import  {polar2Canvas } from 'react-native-redash';
import Svg, { Defs, Mask, Path } from 'react-native-svg';

import { SIZE, STROKE, R, PI, CENTER, arc, absoluteDuration } from './Constants';
import Cursor from './Cursor';
import Gesture from './Gesture';
import Quadrant from './Quadrant';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CircularSlider = (props) => {
	const startPos = useDerivedValue(() => polar2Canvas({ theta: props.start.value, radius: R }, CENTER));
	const endPos = useDerivedValue(() => polar2Canvas({ theta: props.end.value, radius: R }, CENTER));
	const animatedProps = useAnimatedProps(() => {
		const duration = absoluteDuration(props.start.value, props.end.value);
		return {
			d: `M ${startPos.value.x} ${startPos.value.y} A ${R} ${R} 0 ${duration < PI ? "0" : "1"} 0 ${endPos.value.x} ${endPos.value.y}`
		}
	});
	return (
		<View>
			<Svg width={SIZE} height={SIZE}>
				<Defs>
					<Mask id="mask">
						<AnimatedPath animatedProps={animatedProps} stroke="#FD9F07" strokeWidth={STROKE} />
					</Mask>
				</Defs>
				<Quadrant />
				<Cursor pos={startPos} />
				<Cursor pos={endPos} />
			</Svg>
			<Gesture start={props.start} end={props.end} startPos={startPos} endPos={endPos} />
		</View>
	)
}

export default CircularSlider;