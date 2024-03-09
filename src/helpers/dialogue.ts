import { giveRobertaInstructions } from "./robot/robot";

/**
 * Add an event listener to the button that starts the dialogue.
 * 
 * @param {HTMLButtonElement} button 
 * @returns {void}
 */
const setupDialogue = (button: HTMLButtonElement): void => {
  
  button.addEventListener('click', () => {
    const shouldStartListening = button.innerHTML === 'Ange kommando';
    shouldStartListening ? button.innerHTML = 'Klar' : button.innerHTML = 'Ange kommando';

    // Show the description
    const description = document.querySelector<HTMLParagraphElement>('#description')!;
    description.innerHTML = shouldStartListening ? 'Klicka på tangenterna V, H eller G.' : '';

    // Start/stop listening for user input
    listenForUserInput(shouldStartListening);

    if(!shouldStartListening) {
      // Get the final output and pass it to the robot
      const output = document.querySelector<HTMLParagraphElement>('.output')!;

      if(output.innerHTML.length > 0) giveRobertaInstructions(output);
      else showNotification(true, 'Inga instruktioner angivna!');
      
    }
  });
}

/**
 * Add an event listener to the DOM to listen for keyboard input.
 * 
 * @param {boolean} shouldStartListening
 * @returns {void}
 */
const listenForUserInput = (shouldStartListening: boolean): void => {
  if(shouldStartListening) document.addEventListener('keydown', handleKeyboardEvents);
  else document.removeEventListener('keydown', handleKeyboardEvents);
}

/**
 * Check keyboard inputs and write visual feedback to the DOM
 * 
 * @param {KeyboardEvent} event
 * @returns {void}
 */
const handleKeyboardEvents = (event: KeyboardEvent): void => {
  if(event.key !== 'Enter') event.preventDefault();
  const output = document.querySelector<HTMLParagraphElement>('.output')!;

  switch (event.key) {
    case 'v':
    case 'h':
    case 'g':
      // If the key is 'v', 'h', or 'g', append it to the output and hide the notification
      output.innerHTML += event.key;
  
      // Hide the notification
      showNotification(false);
      break;

    case 'Backspace':
      // If the key is 'backspace', remove the last letter/span from the output
      if(output.lastChild?.nodeName === 'SPAN') output.removeChild(output.lastChild);
      else output.innerHTML = output.innerHTML.slice(0, -1);
      break;

    default:
      // For any other key, wrap the invalid letter in a span to highlight it as invalid
      const invalidLetter = document.createElement('span');
      invalidLetter.innerHTML = event.key;
      if(isLetter(event.key)) output.innerHTML += invalidLetter.outerHTML;
  
      // Show the notification
      showNotification(true, 'Ett ogiltigt värde har angivits!');
      break;
   }
}

/**
 * Used to show/hide a notification
 * 
 * @param {boolean} isShowing 
 * @param {string} message
 * @returns {void}
 */
const showNotification = (isShowing: boolean, message: string = ''): void => {
  const notification = document.querySelector<HTMLDivElement>('.notification')!;

  notification.innerHTML = message;
  notification.style.display = isShowing ? 'block' : 'none';
}

/**
 * Check if the given key is a letter.
 * 
 * @param {string} key 
 * @returns {boolean}
 */
const isLetter = (key: string): boolean => {
  // Regular expression to match only letters (both uppercase and lowercase)
  const regex = /^[a-zA-Z]$/;
  return regex.test(key);
}

export { 
  setupDialogue 
};