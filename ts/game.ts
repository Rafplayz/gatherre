import * as gm from 'gamemanager'
import {Player} from 'Player'

let player: Player



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
gm.load()