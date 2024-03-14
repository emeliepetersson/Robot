import { texts } from "../language/language";
import { showModal } from "../modal/modal";
import { showNotification } from "../notification/notification";
import { showPosition } from "../room/room";
import { Directions, Shapes, StartingValues } from "../room/room.types";
import { Position, RobotSize } from "./robot.types";
import robotImg from '/robot.png'

let commands: string = '';
let context: CanvasRenderingContext2D | null;
let img: HTMLImageElement;
let currentPosition: Position;
let currentDirection: Directions;
let startingValues: StartingValues;

/**
 * Place the robot at a given position in a room
 * 
 * @param {HTMLCanvasElement} room 
 * @param {Position} position
 * @param {Directions} direction
 * @returns {void}
 */
const setupRobot = (room: HTMLCanvasElement, initialValues: StartingValues): void => {
    context = room.getContext("2d");
    img = new Image();
    img.src = robotImg;
    img.className = "robot";
    startingValues = initialValues;

    // Set current position and direction to use later when moving the robot
    currentDirection = initialValues.direction;
    currentPosition = {
        x: initialValues.position.x,
        y: initialValues.position.y
    }

    // Canvas needs a preloaded image in order to draw/display it in itself
    img.onload = () => {    
        if(!context) {
            showNotification(true, 'global-notification', 'error', texts.errorSetupRobot);
            return;
        }
        context.drawImage(img, initialValues.position.x, initialValues.position.y, RobotSize.width, RobotSize.height); 
    };
};

/**
 * Show a modal with the given commands and a button start to moving the robot
 * 
 * @param {HTMLDivElement} input 
 * @returns {void}
 */
const giveRobotCommands = (input: HTMLDivElement): void => {
    // Remove all spans (= invalid keys) from the input
    commands = input.innerHTML.replace(/<span>.*?<\/span>/g, '');
    showModal(texts.givenCommands, commands, texts.go, moveRobot)
}

/**
 * Loop through the commands and move the robot accordingly
 * 
 * @returns {void}
 */
const moveRobot = (): void => {
    if(!context) {
        showNotification(true, 'global-notification', 'error', texts.errorMoveRobot);
        return;
    }

    for (const command of commands) {
        try {
            // If the command is "G"/"F" (go forward) we update the position
            // Otherwise we update the direction
            if(command.toUpperCase() === texts.forwardCommand) updatePosition();
            else updateDirection(command);

            // Show a notification with the final position and direction
            showPosition(currentPosition.x, currentPosition.y, currentDirection);
        } catch (err) {
            // If there was an error moving the robot we show the final position and direction with an error message
            showPosition(currentPosition.x, currentPosition.y, currentDirection, true);
            break;
        }
    }

    // Clear the canvas and draw the robot at the new position
    // (Fill the canvas with the background color)
    context.fillStyle = "white";
    context.fillRect(-context.canvas.width, -context.canvas.height, context.canvas.width * 2, context.canvas.height * 2);
    context.drawImage(img, currentPosition.x, currentPosition.y, RobotSize.width, RobotSize.height); 
}

/**
 * Update the current position
 * 
 * @returns {void}
 */
const updatePosition = (): void => { 
    // Updates x or y position based on the current direction
    const isVertical = [Directions.North, Directions.South].includes(currentDirection);
    const axis = isVertical ? 'y' : 'x';

    // Decrement or increment the current position based on the current direction
    // (north and west should decrement, south and east should increment)
    const operator = [Directions.West, Directions.North].includes(currentDirection) ? 'decrement' : 'increment';

    const term = operator === 'increment' ? 1 : -1;
    const newPosition = {
        ...currentPosition,
        [axis]: currentPosition[axis] + term
    };
    
    // Throw an error if the new position is outside the canvas 
    if(!isRobotInsideRoom(newPosition)) {
        throw new Error(texts.errorOutsideRoom);
    }

    currentPosition = newPosition;
};

/**
 * Update the current direction
 * 
 * @param {string} command
 * @returns {void}
 */
const updateDirection = (command: string): void => {
    const directions: Directions[] = [Directions.North, Directions.East, Directions.South, Directions.West];
    const currentIndex = directions.indexOf(currentDirection);

    if(command.toUpperCase() === texts.rightCommand) {
        // Get the next direction in the directions array
        const nextIndex = (currentIndex + 1) % directions.length; // (Use the modulo operator (%) to cycle through the directions array)
        currentDirection = directions[nextIndex];

    } else if(command.toUpperCase() === texts.leftCommand) {
        // Get the previous direction in the directions array
        const previousIndex = (currentIndex - 1 + directions.length) % directions.length;
        currentDirection = directions[previousIndex];
    }
};

/**
 * Calculate if the robot is inside the room
 * 
 * @param {Position} position
 * @returns {boolean}
 */
const isRobotInsideRoom = (position: Position): boolean => {
    if(!context) {
        showNotification(true, 'global-notification', 'error', texts.errorMoveRobot);
        return false;
    }

    // If the room is a circle
    if(startingValues.shape === Shapes.Circle) {
        const radius = context.canvas.width / 2;
        const squareInPixels = radius / startingValues.amountOfSquares;

        const distanceX = position.x * squareInPixels;
        const distanceY = position.y * squareInPixels;

        // Calculate the robot's distance from the origo and check if it's larger than the radius
        // (The distance is the hypotenuse of a right-angled triangle)
        const distanceFromOrigo = Math.hypot(distanceX, distanceY);
        return distanceFromOrigo < radius;
    }
    
    // If the room is a square
    if(position.x < 0 || position.y < 0 || position.x >= startingValues.amountOfSquares || position.y >= startingValues.amountOfSquares) {
        return false;
    }

    return true;
};

/**
 * Get the current position of the robot
 */
const getCurrentPosition = (): Position => currentPosition;

export { 
    setupRobot, 
    giveRobotCommands,
    getCurrentPosition
};