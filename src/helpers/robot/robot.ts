import { Position, RobotSize } from "./robot.types";
import robotImg from '/robot.png'

/**
 * Place the robot at a given position in a room
 * 
 * @param {HTMLCanvasElement} room 
 * @param {Position} position
 * @returns {void}
 */
const setupRobot = (room: HTMLCanvasElement, position: Position): void => {
    const context = room!.getContext("2d");
    const img = new Image();
    img.src = robotImg;
    img.className = "robot";

    if(!context) return;

    // Canvas needs a preloaded image in order to draw/display it in itself
    img.onload = () => {    
        context.drawImage(img, position.x, position.y, RobotSize.width, RobotSize.height); 
    };
};

export { setupRobot };