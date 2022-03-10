//  imports
import * as gm from './gamemanager'
import {TimedButton} from './TimedButton'
import {Button} from './Button'
import {Player} from './Player'
//  globals
const PLAYER: Player = gm.load()
gm.initTimeouts(
    {func: gm.save,time: 14000,param: PLAYER},
    {func: gm.Update,time: 100,param: () => {
        $("#Berry").text(`Berries: ${PLAYER.berries}`)
        $("#Stick").text(`Sticks: ${PLAYER.sticks}`)
    }}
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
