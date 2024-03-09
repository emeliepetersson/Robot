import './style'
import robotImg from '/robot.png'
import { setupDialogue } from './helpers/dialogue.ts'
import { setupRoom } from './helpers/room/room.ts'
import { setupRobot } from './helpers/robot/robot.ts'
import { StartingValues } from './helpers/room/room.types.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <img src="${robotImg}" class="image" alt="Robot emoji" />
  <h1>Robot Roberta</h1>
  <button id="language" class="-secondary -small" type="button">In English</button>

  <div id="backdrop" class="backdrop"></div>
  <div id="modal" class="modal">
   <div class="modal-content">
      <h2></h2>
      <p></p>
      <button></button>
    </div>
  </div>
  
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

      <button id="dialogue" type="button">Ange kommandon</button>

      <p id="description" class="description"></p>

      <p class="output"></p>

      <div class="notification"></div>
    </div>
  </div>
`

const startingValues: StartingValues = {
  shape: 'square',
  position: { x: 0, y: 0 },
  amountOfSquares: 5,
  direction: 'north' // When the program starts the robot is always facing north
}

// Render a room with the given shape and number of squares
setupRoom(document.querySelector<HTMLDivElement>('#house')!, startingValues.amountOfSquares, startingValues.shape)

// Place the robot at a given position in the room
setupRobot(document.querySelector<HTMLCanvasElement>('#room')!, startingValues.position, startingValues.direction)

// Add an event listener to the button that starts the dialogue
setupDialogue(document.querySelector<HTMLButtonElement>('#dialogue')!)
