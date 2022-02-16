const updateInterval = setInterval(Update,100)
const autosaveInterval = setInterval(save,60000)
let player: Player;
function getInitialPlayer() {
    return {
        berries: 0,
    }
}
function save() {
    window.localStorage.setItem('player',JSON.stringify(player))
    return JSON.stringify(player)
}
function load() {
    const localStoredPlayer = localStorage.getItem('player')
    if(localStoredPlayer == undefined){player = getInitialPlayer();return}
    try {
    player = JSON.parse(localStoredPlayer)
    }
    catch(err) {
        console.error(err) // TODO: add an error popup
    }
}
function gatherItems(): void{
    console.log("gatherItems received")
    player.berries++
}
const gatherButton = new TimedButton(
    "Gather (timed)",
    "gatherTimed",
    gatherItems,
    "Gathers items after a short delay.",
    2000
)
gatherButton.assign("gatherButton")
function Update(): void {
    updateElement("main",`Berries: ${player.berries}`)
}
function updateElement(elementID: string,text: string): void {
    let elem = document.getElementById(elementID)
    if(elem == null) throw new Error("elementID must be a valid ID")
    elem.innerText = text
}
load()