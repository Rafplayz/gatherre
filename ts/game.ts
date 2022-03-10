import * as gm from 'gamemanager'
import {Player} from 'Player'
let player: Player
player = gm.load()
gm.initTimeouts(
    {func: () => {},time: 14000,param: player},
    {func: () => {},time: 100,param: player}
)


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
