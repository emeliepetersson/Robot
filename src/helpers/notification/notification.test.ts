import { mockDocumentBody } from "../../../mocks/domMocks";
import { showNotification } from "./notification";

mockDocumentBody();

describe('Notification', () => {
    it('should display a notification', () => {
        showNotification(true, 'user-input', 'error', 'Message');

        const notification = document.getElementById('user-input')!;
        expect(notification.style.display).toBe('block');
        expect(notification.textContent).toBe('Message');
    });

    it('should display an error notification', () => {
        showNotification(true, 'user-input', 'error', 'Message');

        const notification = document.getElementById('user-input')!;
        expect(notification.classList.contains('error')).toBe(true);
    });

    it('should display an success notification', () => {
        showNotification(true, 'user-input', 'success', 'Message');

        const notification = document.getElementById('user-input')!;
        expect(notification.classList.contains('success')).toBe(true);
    });

    it('should display an info notification', () => {
        showNotification(true, 'user-input', 'info', 'Message');

        const notification = document.getElementById('user-input')!;
        expect(notification.classList.contains('info')).toBe(true);
    });
});