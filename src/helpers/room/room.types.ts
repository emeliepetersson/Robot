import { Position } from "../robot/robot.types";

export type Shapes = 'circle' | 'square';

export interface StartingValues {
    shape: Shapes;
    position: Position;
    amountOfSquares: number;
}