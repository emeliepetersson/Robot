import { mockDocumentBody } from "../../../mocks/domMocks";
import { setupRoom, showPosition } from "./room";
import { Directions, Shapes } from "./room.types";

mockDocumentBody();

describe("Room", () => {

    beforeEach(() => {
        //remove the canvas element
        const room = document.getElementById('room');
        if(room) room.remove();
    });

    it("should render a square canvas with the given sixe", () => {
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 5, Shapes.Square);
        const multiplier = 100;

        const room = document.getElementById('room') as HTMLCanvasElement;
        const context = room.getContext('2d');

        expect(room).not.toBeNull();
        expect(context).not.toBeNull();
        expect(room.classList).not.toContain('circle');
        expect(room.width).toBe(5 * multiplier);
        expect(room.height).toBe(5 * multiplier);
    });

    it('should render a circular canvas', () => {
        setupRoom(document.querySelector<HTMLDivElement>('#house')!, 10, Shapes.Circle);
        const multiplier = 50;

        const room = document.getElementById('room') as HTMLCanvasElement;
        const context = room.getContext('2d');

        expect(room).not.toBeNull();
        expect(context).not.toBeNull();
        expect(room.classList).toContain('circle');
        expect(room.width).toBe(10 * multiplier);
        expect(room.height).toBe(10 * multiplier);
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
});