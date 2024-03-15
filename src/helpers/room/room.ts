import { texts } from "../language/language";
import { showNotification } from "../notification/notification";
import { CircleMultiplier, Directions, Shapes, SquareMultiplier } from "./room.types";

/**
 * Setup a room with the given number of squares
 * 
 * @param {HTMLDivElement} house 
 * @param {number} squares 
 * @param {Shapes} shape
 * @returns {void}
 */
const setupRoom = (house: HTMLDivElement, squares: number, shape: Shapes): void => {
    const room = document.createElement('canvas');
    room.id = 'room';
    room.className = shape;
    
    // To set the dimensions of the canvas element, we need to set the width and height attributes
    const multiplier = shape === Shapes.Circle ? CircleMultiplier : SquareMultiplier;
    room.width = squares * multiplier;
    room.height = squares * multiplier;
    
    const context = room.getContext('2d');  
    if(!context) { 
        showNotification(true, 'global-notification', 'error', texts.errorSetupRoom);
        return;
    }

    if(shape === Shapes.Circle) {
        // Calculate the center of the canvas
        const transX = room.width / 2;
        const transY = room.height / 2;

        // Move the origin (0,0) of the canvas to a new position specified by transX and transY
        // (This is makes the origo appear in the middle of the canvas)
        context.translate(transX, transY);
    }

    // Scale the canvas context so that 1 unit corresponds to 100 pixels for squares and 25 pixels for circles
    // ( multiplier / 2 = 25 for circles and multiplier = 100 for squares)
    const scale = shape === Shapes.Circle ? multiplier / 2 : multiplier;
    context.scale(scale, scale);

    house.appendChild(room);
}

/**
 * Display the given position and direction
 * 
 * @param {number} xPos
 * @param {number} yPos
 * @param {Directions} direction
 * @param {boolean | undefined} hasError
 * @returns {void}
 */
const showPosition = (xPos: number, yPos: number, direction: Directions, hasError?: boolean): void => {
    const positionCard = document.querySelector<HTMLDivElement>('.position')!;
    const x = positionCard.querySelector<HTMLSpanElement>('.x')!;
    const y = positionCard.querySelector<HTMLSpanElement>('.y')!;
    const dir = positionCard.querySelector<HTMLSpanElement>('.direction')!;

    x.textContent = xPos.toString();
    y.textContent = yPos.toString();
    dir.textContent = direction;

    if(hasError) positionCard.classList.add('error');
    else positionCard.classList.remove('error');

    // Show/hide the error message
    const errorMessage = positionCard.querySelector<HTMLParagraphElement>('.error-message')!;
    errorMessage.style.display = hasError ? 'block' : 'none';
}

export { 
    setupRoom, 
    showPosition 
};