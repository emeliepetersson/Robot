import { showModal } from "../modal/modal";
import { showNotification } from "../notification";
import { Directions, initialValues } from "../room/room.types";
import { Position, RobotSize } from "./robot.types";
import robotImg from '/robot.png'

let commands: string = '';
let context: CanvasRenderingContext2D | null;
let img: HTMLImageElement;
let currentPosition: Position;
let currentDirection: Directions;

/**
 * Place the robot at a given position in a room
 * 
 * @param {HTMLCanvasElement} room 
 * @param {Position} position
 * @param {Directions} direction
 * @returns {void}
 */
const setupRobot = (room: HTMLCanvasElement, position: Position, direction: Directions): void => {
    context = room!.getContext("2d");
    img = new Image();
    img.src = robotImg;
    img.className = "robot";

    // Set current position and direction to use later for moving the robot
    currentDirection = direction;
    currentPosition = {
        x: position.x,
        y: position.y
    }

    // Canvas needs a preloaded image in order to draw/display it in itself
    img.onload = () => {    
        if(!context) return;
        context.drawImage(img, position.x, position.y, RobotSize.width, RobotSize.height); 
    };
};

/**
 * Show a modal with the given commands and a button to move the robot
 * 
 * @param {HTMLDivElement} output 
 * @returns {void}
 */
const giveRobertaCommands = (output: HTMLDivElement): void => {
    // Remove all spans (= invalid keys) from the output
    commands = output.innerHTML.replace(/<span>.*?<\/span>/g, '');
    showModal('Givna kommandon:', commands, 'Kör', moveRoberta)
}

/**
 * Loop through the commands and move the robot accordingly
 * 
 * @returns {void}
 */
const moveRoberta = (): void => {
    if(!context) return;

    for (const command of commands) {
        try {
            // If the command is "G" (go forward) we update the position
            // Otherwise we update the direction
            if(command.toUpperCase() === "G") updatePosition();
            else updateDirection(command);

            // Show a notification with the final position and direction
            showNotification(true, false, `Roberta är nu på position x: ${currentPosition.x}, y: ${currentPosition.y} och tittar åt ${currentDirection}`);
        } catch (err) {
            showNotification(true, true, `Roberta kan inte gå utanför rummet! Hon stannade på x: ${currentPosition.x}, y: ${currentPosition.y} och tittar åt ${currentDirection}`);
            break;
        }
    }

    // Clear the canvas and draw the robot at the new position
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(img, currentPosition.x, currentPosition.y, RobotSize.width, RobotSize.height); 
}

/**
 * Update the current position
 * 
 * @returns {void}
 */
const updatePosition = (): void => { 
    // Updates x or y position based on the current direction
    const isVertical = ['north', 'south'].includes(currentDirection);
    const axis = isVertical ? 'y' : 'x';

    // Decrement or increment the current position based on the current direction
    const operator = ['west', 'south'].includes(currentDirection) ? 'decrement' : 'increment';
    const term = operator === 'increment' ? 1 : -1;
    const newPosition = {
        ...currentPosition,
        [axis]: currentPosition[axis] + term
    };
    
    // Throw an error if the new position is outside the canvas 
    if(newPosition.x < 0 || newPosition.y < 0 || newPosition.x > initialValues.amountOfSquares || newPosition.y > initialValues.amountOfSquares) {
        throw new Error("Roberta can't go outside the room!");
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
    const directions: Directions[] = ['north', 'east', 'south', 'west'];
    const currentIndex = directions.indexOf(currentDirection);

    if(command.toUpperCase() === 'H') {
        // Get the next direction in the directions array
        const nextIndex = (currentIndex + 1) % directions.length; // (Used the modulo operator (%) to cycle through the directions array)
        currentDirection = directions[nextIndex];

    } else if(command.toUpperCase() === 'V') {
        // Get the previous direction in the directions array
        const previousIndex = (currentIndex - 1 + directions.length) % directions.length;
        currentDirection = directions[previousIndex];
    }
};

export { 
    setupRobot, 
    giveRobertaCommands 
};