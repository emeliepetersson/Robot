import { Position } from "../robot/robot.types";

export type Shapes = 'circle' | 'square';

export type Directions = 'north' | 'east' | 'south' | 'west';

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
    direction: Directions;
}