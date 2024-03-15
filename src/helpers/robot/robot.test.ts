import { Directions, PositionAndDirection, Shapes, StartingValues } from "../room/room.types";
import { mockDocumentBody } from "../../../mocks/domMocks";
import { getCurrentDirection, getCurrentPosition, giveRobotCommands, setupRobot } from "./robot";
import { RobotSize } from "./robot.types";
import robotImg from '/robot.png'
import { setupRoom } from "../room/room";
import { texts } from "../language/language";

let room: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;
let img: HTMLImageElement;
let notification: HTMLElement;

const initialValues: StartingValues = {
    shape: Shapes.Circle,
    position: { x: 0, y: 0 },
    amountOfSquares: 10,
    direction: Directions.North
}

/**
 * Return a canvas with a mocked context
 * for testing error handling
 * 
 * @return {HTMLCanvasElement}
 */
const getErrorCanvas = (): HTMLCanvasElement => {
    // Mock getContext to return null
    const getContextMock = jest.fn(() => null);
    const room = document.createElement('canvas');
    room.getContext = getContextMock;

    return room;
}

/**
 * Give the robot commands to move
 * 
 * @param {string} commands
 * @returns {PositionAndDirection}
 */
const passCommandsToRobot = (commands: string): PositionAndDirection => {
    // Add commands to the input
    const input = document.querySelector<HTMLParagraphElement>('.input')!;
    input.innerHTML = commands;

    giveRobotCommands(input);

    // Get the confirmation button via the modal
    const modal = document.getElementById('modal')!;
    const button = modal.querySelector('button');
    button?.click();

    return {
        position: getCurrentPosition(),
        direction: getCurrentDirection()
    }
};

describe('Robot', () => {
    beforeAll(() => {
        mockDocumentBody();
        
        // Setup the room (canvas)
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, initialValues.amountOfSquares, initialValues.shape)
        room = document.getElementById('room') as HTMLCanvasElement;
        
        // Mock the drawImage method
        jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage').mockImplementation(() => null);

        // Mock the image onload method
        jest.spyOn(HTMLImageElement.prototype, 'onload', 'set').mockImplementation((fn) => {
            // Create a mock Event object
            const mockEvent = new Event('load');
            
            // Call the function with the mock Event object and explicitly set the context
            // Ensure fn is not null and call it with a valid this context
            if (fn) fn.call(window, mockEvent);
        });

        notification = document.querySelector<HTMLDivElement>('#global-notification')!;
    });

    beforeEach(()=>{
        setupRobot(room, initialValues);
    })

    it('should render the robot', async () => {
        context = room.getContext("2d");
        
        // Mock robot image
        img = new Image();
        img.src = robotImg;
        img.className = "robot";

        expect(context).not.toBeNull();
        expect(context!.drawImage).toHaveBeenCalledWith(img, initialValues.position.x, initialValues.position.y, RobotSize.width, RobotSize.height);
    });

    it('should move the robot', () => {
        const { position } = passCommandsToRobot('VGG')

        // Since we gave the robot the command to turn left and then move forward twice 
        // the position should have been updated
        expect(position).not.toEqual(initialValues.position);
    })

    it('should display an error notification if there was a problem setting up the robot', () => {
        const room = getErrorCanvas();
        setupRobot(room, initialValues);

        expect(notification.style.display).toBe('block');
        expect(notification.innerHTML).toBe(texts.errorSetupRobot);
    });

    it('should display an error notification if there was a problem moving the robot', () => {
        const room = getErrorCanvas();
        setupRobot(room, initialValues);

        passCommandsToRobot('VGH')

        expect(notification.style.display).toBe('block');
        expect(notification.innerHTML).toBe(texts.errorMoveRobot);
    });

    it('should prevent the robot from moving outside a circular room', () => {
        const { position } = passCommandsToRobot('GGGGGGGGGGG');

        // We gave the robot the command to move forward 11 times, 
        // but since the robot starts att (0,0) facing north and the room is 10x10, 
        // we expect the new position to be 0,-10
        expect(position.y).toBe(-10);
    })

    it('should prevent the robot from moving outside a square room', () => {
        const initalValuesSquare: StartingValues = {
            shape: Shapes.Square,
            position: { x: 0, y: 0 },
            amountOfSquares: 5,
            direction: Directions.South
        };

        setupRobot(room, initalValuesSquare);
        const { position } = passCommandsToRobot('GGGGGGGGGG');

        // We gave the robot the command to move forward 10 times, 
        // but since the robot starts att (0,0) facing south and the room is 5x5,
        // the robot should only be able to move 4 steps in that direction before hitting a wall
        expect(position.y).toBe(4);
    });

    it('should change direction when turning left', () => {
        const { direction } = passCommandsToRobot('v');

        // Since we start facing north and turn left the new direction should be west
        expect(direction).toBe(Directions.West);
    });

    it('should change direction when turning right', () => {
        const { direction } = passCommandsToRobot('h');

        // Since we start facing north and turn right the new direction should be east
        expect(direction).toBe(Directions.East);
    });
});