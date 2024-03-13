import { mockDocumentBody } from "../../../mocks/domMocks";
import { sv } from "../language/language.types";
import { setupDialogue } from "./dialogue";

mockDocumentBody();
let button: HTMLButtonElement;
let output: HTMLParagraphElement;

/**
 * Simulate a keyboard event
 * 
 * @param {string} key
 * @returns {void}
 */
const simulateKeyboardEvent = (key: string): void => {
    const keyboardEvent = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keyboardEvent);
};

describe("Dialogue", () => {
    beforeAll(() => {
        button = document.querySelector<HTMLButtonElement>('#dialogue')!;
        output = document.querySelector<HTMLParagraphElement>('.output')!;
        setupDialogue(button);
    })

    beforeEach(()=> {
        // This resets the command button text to the default value
        button.innerHTML = sv.commandButton;
    });

    it("should change button text and display description when clicking on dialogue button", () => {
        const buttonText = button.innerHTML;
        expect(buttonText).toBe(sv.commandButton);

        button.click();

        // After button click the button text should change...
        expect(button.innerHTML).toBe(sv.commandButtonDone);
        
        // ...and the description should be displayed
        const description = document.querySelector<HTMLParagraphElement>('#description')!;
        expect(description.innerHTML).toBe(sv.commandsInstructions);
    });

    it('should listen for keyboard input when the dialogue button is clicked', async() => {
        button.click();

        // Simulates a press of the 'v' key
        simulateKeyboardEvent('v');

        // Check if the output is updated
        expect(output.innerHTML).toBe('v');
    });

    it('should stop listening for keyboard input when the dialogue button is clicked again', () => {
        button.click();
        button.click();

        // Simulates a press of the 'h' key
        simulateKeyboardEvent('h');

        // Check if the output is updated (it should still be empty)
        expect(output.innerHTML).toBe('');
    });

    it('should highlight invalid commands', () => {
        button.click();

        // Simulates a press of the 'x' key (which is not a valid command)
        simulateKeyboardEvent('x');

        // Check if the output is updated
        expect(output.innerHTML).toBe('<span>x</span>');
    });

    it('should show a notification if no command are given', () => {
        button.click();
        button.click();

        // Check if a notification is displayed
        const notification = document.querySelector<HTMLDivElement>('#user-input')!;
        expect(notification.innerHTML).toBe(sv.commandsError);
    });
    
    it('should remove command when clicking on the backspace key', () => {
        button.click();

        // Simulates a press of the 'v' key
        simulateKeyboardEvent('v');
        simulateKeyboardEvent('a');

        // Simulates a press of the 'backspace' key
        simulateKeyboardEvent('Backspace');

        // Check if the output is updated
        expect(output.innerHTML).toBe('v');
    });

    it('should pass the given commands to the robot', () => {
        button.click();

        // Simulates a press of the 'v' key
        simulateKeyboardEvent('v');
        simulateKeyboardEvent('h');
        simulateKeyboardEvent('g');
        simulateKeyboardEvent('a');

        // a should be highlighted as an invalid command
        expect(output.innerHTML).toBe('vhg<span>a</span>');

        button.click();

        // Check if the modal with the given commands is displayed
        const modal = document.querySelector<HTMLDivElement>('.modal')!;
        const messageElement = modal!.querySelector('p');
        expect(modal.style.display).toBe('block');

        // The modal should only contain the valid commands
        expect(messageElement!.innerHTML).toBe('vhg');
    });
});