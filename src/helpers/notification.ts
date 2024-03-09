/**
 * Show notification message
 * 
 * @param {boolean} isShowing
 * @param {boolean} isError 
 * @param {string} message 
 * @returns {void}
 */
const showNotification = (isShowing: boolean, isError?: boolean, message?: string): void => {
    const notification = document.querySelector<HTMLDivElement>('.notification')!;
    notification.innerHTML = message || '';
    notification.style.display = isShowing ? 'block' : 'none';
    notification.classList.add(isError ? '-error' : '-success');
};

export { showNotification }