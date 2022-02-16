let updateInterval = setTimeout(Update,100)
let saveTimeout = setTimeout(saveTimeoutHandler,14000)
let player: Player;
let saveDateCheck: number
let updateDateCheck: number
function saveTimeoutHandler() {
    const currentDate = Date.now()
    if(saveDateCheck === undefined) saveDateCheck = currentDate
    if ((currentDate - saveDateCheck >= 14000)){
        save();
        console.clear();
        console.log("saved")
    }
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(saveTimeoutHandler,14000)
}
function getInitialPlayer() {
    return {
        berries: 0,
    }
}
function save() {
    const storedPlayer = JSON.stringify(player)
    window.localStorage.setItem('player',storedPlayer)
    return storedPlayer
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
    const currentDate = Date.now()
    if(updateDateCheck === undefined) updateDateCheck = currentDate
    if((currentDate - updateDateCheck >= 100)){
        updateElement("main",`Berries: ${player.berries}`)
    }
    updateDateCheck = Date.now()
    updateInterval = setTimeout(Update,100)
}
function updateElement(elementID: string,text: string): void {
    let elem = document.getElementById(elementID)
    if(elem == null) throw new Error("elementID must be a valid ID")
    elem.innerText = text
}
load()