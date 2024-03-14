import { Position } from "../robot/robot.types";

export enum Shapes {
    Circle = 'circle',
    Square = 'square'
}

export enum Directions {
    North = 'north',
    East = 'east',
    South = 'south',
    West = 'west'
}

export const initialValues: StartingValues = {
    shape: Shapes.Square,
    position: { x: 1, y: 2 },
    amountOfSquares: 5,
    direction: Directions.North // When the program starts the robot is always facing north
};

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
    direction: Directions;
}