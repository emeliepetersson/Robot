import { mockDocumentBody } from "../../../mocks/domMocks";
import { showModal } from "./modal";

mockDocumentBody();

// Mock callback for the modal button
const modalButtonCb = jest.fn();

describe('Modal', () => {
    it('should display a modal', () => {
        showModal('Title', 'Message', 'Button', modalButtonCb);

        const backdrop = document.getElementById('backdrop')!;
        const modal = document.getElementById('modal')!;

        expect(backdrop.style.display).toBe('block');
        expect(modal.style.display).toBe('block');
    });

    it('should call given callback when clicking on button in modal', () => {
        showModal('Title', 'Message', 'Button', modalButtonCb);

        const modal = document.getElementById('modal')!;
        const button = modal.querySelector('button')!;

        button.click();

        expect(modalButtonCb).toHaveBeenCalledTimes(1);
    });

    it('should display given title, message and button text in modal', () => {
        showModal('Title', 'Message', 'Button', modalButtonCb);

        const modal = document.getElementById('modal')!;
        const title = modal.querySelector('h2')!;
        const message = modal.querySelector('p')!;
        const button = modal.querySelector('button')!;

        expect(title.textContent).toBe('Title');
        expect(message.textContent).toBe('Message');
        expect(button.textContent).toBe('Button');
    });

    it('should close the modal when clicking on the button', () => {
        showModal('Title', 'Message', 'Button', modalButtonCb);

        const modal = document.getElementById('modal')!;
        const backdrop = document.getElementById('backdrop')!;
        const button = modal.querySelector('button')!;

        button.click();

        expect(modal.style.display).toBe('none');
        expect(backdrop.style.display).toBe('none');
    });
});