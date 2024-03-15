import { NotificationStatus } from "./notification.types";

/**
 * Show notification message
 * 
 * @param {boolean} isShowing
 * @param {string} notificationID
 * @param {NotificationStatus | undefined} status 
 * @param {string | undefined} message 
 * @returns {void}
 */
const showNotification = (isShowing: boolean, notificationID: string, status?: NotificationStatus, message?: string): void => {
    const notification = document.querySelector<HTMLDivElement>(`.notification#${notificationID}`)!;
    notification.innerHTML = message ?? '';
    notification.style.display = isShowing ? 'block' : 'none';
    
    // Remove all status-classes from the notification
    // and add the class for the current status
    if(isShowing){ 
        notification.classList.remove('error', 'success', 'info');
        notification.classList.add(status ?? 'info');
    }
};

export { showNotification }