import { ModalButtonCb } from "./modal.types";

let modal: HTMLElement;
let backdrop: HTMLElement;

/**
 * Shows a modal with a title, message and button
 * 
 * @param {string} title
 * @param {string} message
 * @param {string} buttonText
 * @param {ModalButtonCb} buttonCallback
 * @returns {void}
 */
const showModal = (title: string, message: string, buttonText: string, buttonCallback: ModalButtonCb): void => {
    backdrop = document.getElementById('backdrop')!;
    modal = document.getElementById('modal')!;
    const titleElement = modal.querySelector('h2')!;
    const messageElement = modal.querySelector('p')!;
    const button = modal.querySelector('button')!;

    titleElement.textContent = title;
    messageElement.textContent = message;
    button.textContent = buttonText;
    button.onclick = () => {
        buttonCallback();
        closeModal();
    };
    
    backdrop.style.display = 'block';
    modal.style.display = 'block';
}

/**
 * Close the modal
 * 
 * @returns {void}
 */
const closeModal = (): void => {
    backdrop.style.display = 'none';
    modal.style.display = 'none';
}

export { showModal };