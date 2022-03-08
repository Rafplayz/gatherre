let updateInterval = setTimeout(Update,100)
let saveTimeout = setTimeout(saveTimeoutHandler,14000)
let player: Player
let saveDateCheck: number
let updateDateCheck: number
let popupNumber = 0

function gatherItems(): void{
    const rand = Math.random()
    if(rand >= 0.5) {
        console.log("Ran")
        player.berries = player.berries + 2n
    }
    else {
        player.berries++
    }
    console.log("gatherItems received")
}




const gatherButton = new TimedButton(
    "Gather (timed)",
    "gatherTimed",
    gatherItems,
    "Gathers items after a short delay.",
    2000
)
gatherButton.assign("gatherButton")
load()