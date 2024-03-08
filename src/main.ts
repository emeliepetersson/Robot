import './style'
import robotImg from '/robot.png'
import { setupDialogue } from './helpers/dialogue.ts'
import { setupRoom } from './helpers/room/room.ts'
import { setupRobot } from './helpers/robot/robot.ts'
import { StartingValues } from './helpers/room/room.types.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <img src="${robotImg}" class="image" alt="Robot emoji" />
    <h1>Robot Roberta</h1>
  
    <div id="house"></div>
      
    <button id="dialogue" type="button">Ange kommando!</button>
  </div>
`

const startingValues: StartingValues = {
  shape: 'square',
  position: { x: 1, y: 2 },
  amountOfSquares: 5
}

// Render a room with the given shape and number of squares
setupRoom(document.querySelector<HTMLDivElement>('#house')!, startingValues.amountOfSquares, startingValues.shape)

// Place the robot at a given position in the room
setupRobot(document.querySelector<HTMLCanvasElement>('#room')!, startingValues.position)

// TODO
setupDialogue(document.querySelector<HTMLButtonElement>('#dialogue')!)
