import { mockDocumentBody } from "../../../mocks/domMocks";
import { showNotification } from "./notification";

mockDocumentBody();

describe('Notification', () => {
    it('should display a notification', () => {
        showNotification(true, 'user-input', 'error', 'Message');

        const notification = document.getElementById('user-input');
        expect(notification!.style.display).toBe('block');
    });

    it('should display the given message in the notification', () => {
        showNotification(true, 'user-input', 'error', 'Message');

        const notification = document.getElementById('user-input');
        expect(notification!.textContent).toBe('Message');
    });
});