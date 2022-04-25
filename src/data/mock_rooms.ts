export type Room = {
	name: string;
	description: string;
	tags: Array<string>;
	capacity: number;
	pricePerHour: number;
	isActive: boolean;
};
const default_description =
	"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups";

const generateRoom = (
	name: string,
	tags: Array<string>,
	capacity: number,
	pricePerHour: number,
	isActive = false
): Room => {
	return {
		description: default_description,
		name,
		tags,
		capacity,
		pricePerHour,
		isActive,
	};
};

export const rooms: Array<Room> = [
	generateRoom("Big Room 1", ["Big"], 40, 150),
	generateRoom("Big Room 2", ["Big"], 40, 150),
	generateRoom("Big Room 3", ["Big"], 40, 150),
	generateRoom("Big Room 4", ["Big"], 40, 150),
	generateRoom("Small Room 1", ["Small"], 20, 120, true),
	generateRoom("Small Room 2", ["Small"], 20, 120),
	generateRoom("Small Room 3", ["Small"], 20, 120),
	generateRoom("Small Room 4", ["Small"], 20, 120),
	generateRoom("Main Hall", ["Hall"], 80, 200),
];
