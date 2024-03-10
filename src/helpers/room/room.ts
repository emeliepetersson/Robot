import { showNotification } from "../notification/notification";
import { NotificationStatus } from "../notification/notification.types";
import { Shapes } from "./room.types";

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
    const context = room.getContext('2d');  
    room.id = 'room';
    room.className = shape;
    const multiplier = shape === 'circle' ? 50 : 100;

    // To set the dimensions of the canvas element, we need to set the width and height attributes
    // TODO: Is this comment right for the circular canvas?: This will be the maximum y- and x-coordinates of the room (divided with the multiplier)
    room.width = squares * multiplier;
    room.height = squares * multiplier;

    // TODO: add error handling
    if(!context) return;

    if(shape === 'square') {
        // Move the origo (0,0) to the bottom left corner
        context.translate(0, room.height);
    }

    if(shape === 'circle') {
        // Calculate the center of the canvas
        const transX = room.width * 0.5;
        const transY = room.height * 0.5;

        // TODO: need to understand this better: Translate the context to the center of the canvas
        context.translate(transX, transY);
    }


    // TODO understand this: Scale the canvas context so that 1 unit corresponds to 100 pixels for squares and 25 pixels for circles
    // ( multiplier / 2 = 25 for circles and multiplier = 100 for squares)
    const scale = shape === 'circle' ? multiplier / 2 : multiplier;
    context.scale(scale, -scale); // The negative scale is to make the y-axis point upwards

    house.appendChild(room);
}

/**
 * Show a notification with the current position of the robot
 * 
 * @param {NotificationStatus} status
 * @param {string} message
 * @returns {void}
 */
const showPosition = (status: NotificationStatus, message: string): void => {
    showNotification(true, 'position', status, message)
}

export { 
    setupRoom, 
    showPosition 
};