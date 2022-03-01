let updateInterval = setTimeout(Update,100)
let saveTimeout = setTimeout(saveTimeoutHandler,14000)
let player: Player
let saveDateCheck: number
let updateDateCheck: number
let popupNumber = 0
function errorPopup(error: string|Error) {
    popupNumber++;
    const PopupContainer = $(".popupContainer")
    PopupContainer.append($(`<div id="Error${popupNumber}" class="errorpopup"></div>`))
    const newElement = $(`#Error${popupNumber}`)
    if(typeof error != 'string') error = error.toString()
    newElement.text("There was an error processing game logic. Please report the following: " + error)
    .css({opacity:1})
    setTimeout(function(){
        newElement.fadeOut(2000,'linear',function(){
            this.remove()
        })
    },5000)
    console.error(error)
}
function savePopup(): void {
    popupNumber++
    const PopupContainer = $('.popupContainer')
    PopupContainer.append($(`<div id="savePopup${popupNumber}" class="savePopup">Saved game</div>`))
    $(`#savePopup${popupNumber}`)
    .css({opacity:1})
    .fadeOut(2000,'linear',function(){this.remove()})
}
function inGameErrorHandle(error: any) {
    if(typeof error !== 'string') {console.log(error.toString());return}
    console.log(error)
    errorPopup(error)
}
function saveTimeoutHandler() {
    const currentDate = Date.now()
    if(saveDateCheck === undefined) saveDateCheck = currentDate
    if ((currentDate - saveDateCheck >= 14000)){
        save();
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
    savePopup()
    return storedPlayer
}
function clearSave() {
    const userIn = prompt('Doing this will reset all your data from the start. Type "YES" below to confirm.')
    if(userIn === "YES") {
        window.localStorage.setItem('player','reset')
        document.location.reload()
    }
    else {
        return
    }
}
function load() {
    const localStoredPlayer = localStorage.getItem('player')
    if(localStoredPlayer == undefined || 'wiped'){player = getInitialPlayer();return}
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
const updateElement = (elementID: string,text: string) => $(`#${elementID}`).text(text)
load()