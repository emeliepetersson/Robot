import { mockDocumentBody } from "../../../mocks/domMocks";
import { setupRoom, showPosition } from "./room";
import { CircleMultiplier, Directions, Shapes, SquareMultiplier } from "./room.types";

describe("Room", () => {

    beforeAll(() => {
        mockDocumentBody();
    });

    afterEach(() => {
        //remove the canvas element
        const room = document.getElementById('room');
        if(room) room.remove();
    });

    it("should render a square canvas with the given size", () => {
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 5, Shapes.Square);

        const room = document.getElementById('room') as HTMLCanvasElement;
        const context = room.getContext('2d');

        expect(room).not.toBeNull();
        expect(context).not.toBeNull();
        expect(room.classList).not.toContain('circle');
        expect(room.width).toBe(5 * SquareMultiplier);
        expect(room.height).toBe(5 * SquareMultiplier);
    });

    it('should render a circular canvas', () => {
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 10, Shapes.Circle);

        const room = document.getElementById('room') as HTMLCanvasElement;
        const context = room.getContext('2d');

        expect(room).not.toBeNull();
        expect(context).not.toBeNull();
        expect(room.classList).toContain('circle');
        expect(room.width).toBe(10 * CircleMultiplier);
        expect(room.height).toBe(10 * CircleMultiplier);
    });

    it('should display the current position and direction', () => {
        showPosition(1, 2, Directions.North);
        const positionCard = document.querySelector<HTMLDivElement>('.position')!;
        const x = positionCard.querySelector<HTMLSpanElement>('.x')!;
        const y = positionCard.querySelector<HTMLSpanElement>('.y')!;
        const direction = positionCard.querySelector<HTMLSpanElement>('.direction')!;

        expect(x.textContent).toBe('1');
        expect(y.textContent).toBe('2');
        expect(direction.textContent).toBe(Directions.North);
    });

    it('should display the current position and direction with an error message', () => {
        showPosition(3, -4, Directions.South, true);
        const positionCard = document.querySelector<HTMLDivElement>('.position')!;
        const errorMessage = positionCard.querySelector<HTMLParagraphElement>('.error-message')!;

        expect(positionCard.classList).toContain('error');
        expect(errorMessage.style.display).toBe('block');
    });

    it('should display an error message if there was a problem setting up the room', () => {
        // Mocking the getContext method to return null
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValueOnce(null);

        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 5, Shapes.Square);

        const notification = document.querySelector<HTMLDivElement>('#global-notification')!;
        expect(notification.style.display).toBe('block');
    })
});