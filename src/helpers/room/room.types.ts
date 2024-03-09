import { Position } from "../robot/robot.types";

export const initialValues: StartingValues = {
    shape: 'square',
    position: { x: 1, y: 2 },
    amountOfSquares: 5,
    direction: 'north' // When the program starts the robot is always facing north
};

export type Shapes = 'circle' | 'square';

export type Directions = 'north' | 'east' | 'south' | 'west';

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
    direction: Directions;
}