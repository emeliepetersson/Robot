import { mockDocumentBody } from "../../../mocks/domMocks";
import { showModal } from "./modal";

// Mock callback for the modal button
const modalButtonCb = jest.fn();

let backdrop: HTMLElement;
let modal: HTMLElement;
let modalButton: HTMLButtonElement;


describe('Modal', () => {
    beforeAll(() => {
        mockDocumentBody();
        showModal('Title', 'Message', 'Button', modalButtonCb);

        backdrop = document.getElementById('backdrop')!;
        modal = document.getElementById('modal')!;
        modalButton = modal.querySelector('button')!;
    })

    it('should display a modal', () => {
        expect(backdrop.style.display).toBe('block');
        expect(modal.style.display).toBe('block');
    });

    it('should call given callback when clicking on button in modal', () => {
        modalButton.click();

        expect(modalButtonCb).toHaveBeenCalledTimes(1);
    });

    it('should display given title, message and button text in modal', () => {
        const title = modal.querySelector('h2')!;
        const message = modal.querySelector('p')!;

        expect(title.textContent).toBe('Title');
        expect(message.textContent).toBe('Message');
        expect(modalButton.textContent).toBe('Button');
    });

    it('should close the modal when clicking on the button', () => {
        modalButton.click();

        expect(modal.style.display).toBe('none');
        expect(backdrop.style.display).toBe('none');
    });
});