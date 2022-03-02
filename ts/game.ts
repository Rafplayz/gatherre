let updateInterval = setTimeout(Update,100)
let saveTimeout = setTimeout(saveTimeoutHandler,14000)
let player: Player
let saveDateCheck: number
let updateDateCheck: number
let popupNumber = 0
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
const updateElement = (elementID: string,text: string) => $(`#${elementID}`).text(text)
load()