import './style'
import robotImg from '/robot.png'
import { setupDialogue } from './helpers/dialogue.ts'
import { setupRoom, showPosition } from './helpers/room/room.ts'
import { setupRobot } from './helpers/robot/robot.ts'
import { initialValues } from './helpers/room/room.types.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="header">
    <img src="${robotImg}" class="image" alt="Robot emoji" />
    <h1>Robot Roberta</h1>
    <button id="language" class="-secondary -small" type="button">In English</button>
  </div>

  <div id="backdrop" class="backdrop"></div>
  <div id="modal" class="modal">
   <div class="modal-content">
      <h2></h2>
      <p></p>
      <button></button>
    </div>
  </div>

  <div id="position" class="notification"></div>
  <div class="wrapper">
    <div id="house"></div>

    <div class="commands">
      <div class="card">
        <h2>Giltiga kommandon:</h2>

        <ul>
          <li>
            V: Sväng vänster
          </li>
          <li>
            H: Sväng höger
          </li>
          <li>
            G: Gå framåt 
          </li>
        </ul>
      </div>

      <div class="button-wrapper">
        <button id="dialogue" type="button">Ange kommandon</button>

        <p id="description" class="description"></p>

        <p class="output"></p>

        <div id="user-input" class="notification"></div>
      </div>
    </div>
  </div>
`

// Render a room with the given shape and number of squares
setupRoom(document.querySelector<HTMLDivElement>('#house')!, initialValues.amountOfSquares, initialValues.shape)

// Place the robot at a given position in the room
setupRobot(document.querySelector<HTMLCanvasElement>('#room')!, initialValues.position, initialValues.direction)

// Add an event listener to the button that starts the dialogue
setupDialogue(document.querySelector<HTMLButtonElement>('#dialogue')!)

// Show a notification with the inital position and direction of the robot
showPosition('info', `Roberta är nu på position x: ${initialValues.position.x}, y: ${initialValues.position.y} och tittar åt  ${initialValues.direction}`)
