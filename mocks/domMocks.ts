
/**
 * Mock the DOM elements
 * 
 * @returns void
 */
const mockDocumentBody = (): void => {
    document.body.innerHTML = `
      <div class="header">
        <div id="global-notification" class="notification"></div>
        <img src="" class="image" alt="Robot emoji" />
        <h1>Robot Roberta</h1>
        <button id="language" class="-secondary -small" type="button">English</button>
      </div>
    
      <div id="backdrop" class="backdrop"></div>
      <div id="modal" class="modal">
      <div class="modal-content">
          <h2></h2>
          <p></p>
          <button></button>
        </div>
      </div>
    
      <div class="wrapper">
    
        <div class="commands-wrapper">
          <div class="cards-wrapper">
            <div class="position card">
              <h2>Nuvarande position:</h2>
              <p class="error-message">Roberta gick in i väggen!</p>
              <p>x: <span class="x"></span></p>
              <p>y: <span class="y"></span></p>
              <p><span class="direction-title">Riktning:</span> <span class="direction"></span></p>
            </div>
    
            <div class="card commands">
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
          </div>
    
          <div class="button-wrapper">
            <button id="dialogue" type="button">Ange kommando</button>
    
            <p id="description" class="description"></p>
    
            <p class="input"></p>
    
            <div id="user-input" class="notification"></div>
          </div>
        </div>
    
        <div id="house"></div>
      </div>
    `;
}

export {
    mockDocumentBody
}