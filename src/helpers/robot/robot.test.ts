import { Directions } from "../room/room.types";
import { mockDocumentBody } from "../../../mocks/domMocks";
import { giveRobertaCommands, setupRobot } from "./robot";
import { Position, RobotSize } from "./robot.types";
import robotImg from '/robot.png'
import { setupRoom } from "../room/room";

mockDocumentBody();

let room: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;
let position: Position;
let direction: Directions;
let img: HTMLImageElement;

describe('Robot', () => {
    beforeEach(() => {
        // Setup the room (canvas)
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 6, 'circle')

        // Get reference to the canvas element
        room = document.getElementById('room') as HTMLCanvasElement;

        // Initialize context
        context = null;

        // Mock robot image
        img = new Image();
        img.src = robotImg;
        img.className = "robot";

        // Mock position and direction
        position = { x: 0, y: 0 };
        direction = 'north';
        
        // Mock the drawImage method
        jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage').mockImplementation(() => {});

        // Mock the image onload method
        jest.spyOn(HTMLImageElement.prototype, 'onload', 'set').mockImplementation((fn) => {
            // Create a mock Event object
            const mockEvent = new Event('load');
            
            // Call the function with the mock Event object and explicitly set the context
            // Ensure fn is not null and call it with a valid this context
            if (fn) fn.call(window, mockEvent);
        });
    });

     // Clean up after tests
    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('should render the robot', async () => {
        setupRobot(room, position, direction);
        context = room.getContext("2d");

        expect(context).not.toBeNull();

        expect(context!.drawImage).toHaveBeenCalledWith(img, position.x, position.y, RobotSize.width, RobotSize.height);
    });

    it('should move the robot', () => {
        setupRobot(room, position, direction);
        context = room.getContext("2d");

        // Add commands to the input
        const input = document.querySelector<HTMLParagraphElement>('.input')!;
        input.innerHTML = 'VGH';

        giveRobertaCommands(input);

        // Get the confirmation button via the modal
        const modal = document.getElementById('modal');
        const button = modal!.querySelector('button');
        button?.click();

        // Check if the robot has moved 3 times (since we gave it 3 commands)
        expect(context!.drawImage).toHaveBeenCalledTimes(3);
    })

    // TODO: Fix this test
    // it('should prevent the robot from moving outside the room', () => {
    //     setupRobot(room, position, direction);
    //     context = room.getContext("2d");

    //     // Add commands to the input
    //     const input = document.querySelector<HTMLParagraphElement>('.input')!;
    //     input.innerHTML = 'GGGGGGGGGG';

    //     giveRobertaCommands(input);

    //     // Get the confirmation button via the modal
    //     const modal = document.getElementById('modal');
    //     const button = modal!.querySelector('button');
    //     button?.click();

    //     // We gave the robot 10 commands, but since the robot starts att (0,0) facing north and the room is 5x5, 
    //     // the robot should only be able to move 5 steps in that direction before hitting a wall
    //     expect(context!.drawImage).toHaveBeenCalledTimes(5);
    // })
});