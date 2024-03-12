import { Position } from "../robot/robot.types";

export const initialValues: StartingValues = {
    shape: 'circle',
    position: { x: 0, y: 0 },
    amountOfSquares: 10,
    direction: 'north' // When the program starts the robot is always facing north
};

export type Shapes = 'circle' | 'square';

// TODO: create enum instead
export type Directions = 'north' | 'east' | 'south' | 'west';

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
    direction: Directions;
}