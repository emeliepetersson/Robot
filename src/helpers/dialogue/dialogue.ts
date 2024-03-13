import { texts } from "../language/language";
import { showNotification } from "../notification/notification";
import { giveRobertaCommands } from "../robot/robot";

/**
 * Add an event listener to the button that starts the dialogue.
 * 
 * @param {HTMLButtonElement} button 
 * @returns {void}
 */
const setupDialogue = (button: HTMLButtonElement): void => {
  
  button.addEventListener('click', () => {
    const output = document.querySelector<HTMLParagraphElement>('.output')!;
    const shouldStartListening = button.innerHTML === texts.commandButton;

    // Change the button text
    shouldStartListening ? button.innerHTML = texts.commandButtonDone : button.innerHTML = texts.commandButton;
    if(shouldStartListening) output.innerHTML = '';

    // Show the description
    const description = document.querySelector<HTMLParagraphElement>('#description')!;
    description.innerHTML = shouldStartListening ? texts.commandsInstructions : '';

    // Start/stop listening for user input
    listenForUserInput(shouldStartListening);

    if(!shouldStartListening) {
      // Pass the output to the robot
      if(output.innerHTML.length > 0) giveRobertaCommands(output);
      else showNotification(true, 'user-input', 'error', texts.commandsError);
      
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

  switch (event.key.toUpperCase()) {
    case texts.rightCommand:
    case texts.leftCommand:
    case texts.forwardCommand:
      // If the key is equal to the right, left or forward command append it to the output and hide the notification
      output.innerHTML += event.key;
  
      // Hide the notification
      showNotification(false, 'user-input');
      break;

    case 'BACKSPACE':
      // If the key is 'backspace', remove the last letter/span from the output
      if(output.lastChild?.nodeName === 'SPAN') output.removeChild(output.lastChild);
      else output.innerHTML = output.innerHTML.slice(0, -1);
      break;

    case 'ENTER':
      break;

    default:
      // For any other key, wrap the invalid letter in a span to highlight it as invalid
      const invalidLetter = document.createElement('span');
      invalidLetter.innerHTML = event.key;
      if(isLetter(event.key)) output.innerHTML += invalidLetter.outerHTML;
  
      // Show the notification
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