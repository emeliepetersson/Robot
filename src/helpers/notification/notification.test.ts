import { mockDocumentBody } from "../../../mocks/domMocks";
import { showNotification } from "./notification";

let notification: HTMLElement;

describe('Notification', () => {
    beforeAll(() => {
        mockDocumentBody();
        showNotification(true, 'user-input', 'error', 'Message');
        notification = document.getElementById('user-input')!;
    });

    it('should display a notification', () => {
        expect(notification.style.display).toBe('block');
        expect(notification.textContent).toBe('Message');
    });

    it('should display an error notification', () => {
        expect(notification.classList.contains('error')).toBe(true);
    });

    it('should display an success notification', () => {
        showNotification(true, 'user-input', 'success', 'Message');

        expect(notification.classList.contains('success')).toBe(true);
    });

    it('should display an info notification if no status is given', () => {
        showNotification(true, 'user-input', undefined, 'Message');

        expect(notification.classList.contains('info')).toBe(true);
    });
});