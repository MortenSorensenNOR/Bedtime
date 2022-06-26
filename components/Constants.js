import { Dimensions } from "react-native";
import { min } from "react-native-reanimated";
import { Vector } from "react-native-redash";

const width = Dimensions.get("window").width * 0.9;
export const PADDING = 20;
export const SIZE = width - PADDING * 4;
export const STROKE = 40;
export const R = (SIZE - STROKE) / 2;
export const { PI } = Math;
export const TAU = 2 * PI;
export const CENTER = { x: SIZE / 2, y: SIZE / 2};

export const containedInSquare = (value, center, side) => {
	"worklet";
	const topLeft = { x: center.x - side / 2, y: center.y - side / 2};
	return (
		value.x >= topLeft.x &&
		value.y >= topLeft.y &&
		value.x <= topLeft.x + side &&
		value.y <= topLeft.y + side
	);
}

export const normalize = (value) => {
	"worklet";
	const rest = value % TAU;
	return rest > 0 ? rest : TAU + rest;
}

export const absoluteDuration = (start, end) => {
	"worklet";
	return start > end ? end + (TAU - start) : end - start;
}

export const radToMinutes = (rad) => {
	"worklet";
	return (24 * 60 * rad) / TAU;
}

export const preFormatDuration = (raw) => {
	"worklet";
	const duration = Math.round(raw);
	const minutes = duration % 60;
	const hours = (duration - minutes) / 60;
	return {hours, minutes};
}

export const formatDuration = (duration) => {
	"worklet";
	const { hours, minutes } = preFormatDuration(duration);
	return `${("" + hours).padStart(2, "0")}:${("" + minutes).padStart(2, "0")}`;
}

export const formatDuration2 = (duration) => {
	"worklet";
	const { hours, minutes } = preFormatDuration(duration);
	return `${hours} hr ${minutes} min`;
}

export const arc = (x, y, large = false, sweep = false) => {
	"worklet";
	return `A ${R} ${R} 0 ${large ? "1" : "0"} ${sweep ? "1" : "0"} ${x} ${y}`;
}