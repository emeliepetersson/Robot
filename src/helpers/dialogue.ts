/**
 * TODO
 * 
 * @param {HTMLButtonElement} button 
 * @returns {void}
 */
const setupDialogue = (button: HTMLButtonElement): void => {
  // let counter = 0
  // const setCounter = (count: number) => {
  //   counter = count
  //   element.innerHTML = `count is ${counter}`
  // }
  // element.addEventListener('click', () => setCounter(counter + 1))
  // setCounter(0)

  button.addEventListener('click', () => {
    console.log('Button clicked')
  });
}

const listenForUserInput = () => {

  // Listen for keyboard input and output it to the DOM, 
  // and tell the user if an invalid letter is given.
}

const showDoneButton = () => {
  // Either hide the Start button and show the Done button or switch the text
  // and event listener ot the button
}

// Move Roberta around the room
// This can be used in setupRobot inital render
const giveRobertaInstructions = () => {

  // Call out the final destionation
  // this is done with a switch case that increment/decrements the start x/y positions
}

export { 
  setupDialogue 
};


/**
 * When the user clicks the button, Roberta starts listening for keyboard input.
 * She repeats the given letters and tells the user if an invalid letter is given.
 * When the user clicks the button again, Roberta stops listening.
 * Then she starts walking around the room according to the given letters.
 */

/**
 * Different solutions for moving Roberta to different positions in the room:
 * 
 * - Use a switch statement to check the given letters and move Roberta accordingly.
 * - Use css to place Roberta in the room and change her position with css classes. Flex/Grid?
 * - Use animations to place Roberta in the room.
 * - Use a canvas to draw the room and Roberta, and move her around with canvas methods.
 */