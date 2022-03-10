//  imports
import * as gm from './gamemanager'
import {TimedButton} from './TimedButton'
import {Button} from './Button'
import {Player} from './Player'
//  globals
let PLAYER: Player = gm.load()
gm.initTimeouts(
    {func: () => {},time: 14000,param: PLAYER},
    {func: () => {},time: 100,param: PLAYER}
)


function gatherItems(): void{
    const rand = Math.random()
    if(rand >= 0.5) {
        console.log("Ran")
        PLAYER.berries = PLAYER.berries + 2n
    }
    else {
        PLAYER.berries++
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
