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
    shape: Shapes.Circle,
    position: { x: 0, y: 0 },
    amountOfSquares: 10,
    direction: Directions.North // When the program starts the robot is always facing north
};

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
    direction: Directions;
}

export type PositionAndDirection = {
    position: Position;
    direction: Directions;
}

export const SquareMultiplier = 100;
export const CircleMultiplier = 50;