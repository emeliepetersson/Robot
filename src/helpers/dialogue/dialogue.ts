import { texts } from "../language/language";
import { showNotification } from "../notification/notification";
import { giveRobotCommands } from "../robot/robot";

/**
 * Add an event listener to the button that starts the dialogue 
 * between the user and the robot.
 * 
 * @param {HTMLButtonElement} button 
 * @returns {void}
 */
const setupDialogue = (button: HTMLButtonElement): void => {
  
  button.addEventListener('click', () => {
    const input = document.querySelector<HTMLParagraphElement>('.input')!;
    const shouldStartListening = button.innerHTML === texts.commandButton;

    // Change the button text
    button.innerHTML = shouldStartListening ? texts.commandButtonDone : texts.commandButton;
    if(shouldStartListening) input.innerHTML = '';

    // Show the description
    const description = document.querySelector<HTMLParagraphElement>('#description')!;
    description.innerHTML = shouldStartListening ? texts.commandsInstructions : '';

    // Start/stop listening for user input
    listenForUserInput(shouldStartListening);

    // When the user clicks on the done-button we pass the input to the robot
    if(!shouldStartListening) {
      if(input.innerHTML.length > 0) giveRobotCommands(input);
      else showNotification(true, 'user-input', 'error', texts.commandsError);
    }
  });
}

/**
 * Add an event listener to the document to listen for keyboard input.
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
  const input = document.querySelector<HTMLParagraphElement>('.input')!;

  switch (event.key.toUpperCase()) {
    case texts.rightCommand:
    case texts.leftCommand:
    case texts.forwardCommand:
      // If the key is equal to the right, left or forward command append it to the input and hide the notification
      input.innerHTML += event.key;
      showNotification(false, 'user-input');
      break;

    case 'BACKSPACE':
      // If the key is 'backspace', remove the last letter/span from the input
      if(input.lastChild?.nodeName === 'SPAN') input.removeChild(input.lastChild);
      else input.innerHTML = input.innerHTML.slice(0, -1);
      break;

    case 'ENTER':
      // We only want the enter key to trigger the button click (if the button is focused)
      break;

    default:
      // For any other key, wrap the invalid letter in a span to highlight it
      if(isLetter(event.key)) {
        const invalidLetter = document.createElement('span');
        invalidLetter.innerHTML = event.key;
        input.innerHTML += invalidLetter.outerHTML;
      }
  
      // Show an error notification
      showNotification(true, 'user-input', 'error', texts.commandsInvalid);
      break;
   }
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