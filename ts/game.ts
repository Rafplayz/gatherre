// imports
import * as gm from './gamemanager.js'
import {TimedButton} from './TimedButton.js'
// globals
const PLAYER: Player = gm.load()
// game manager initialization
gm.initTimeouts(
    {func: gm.save,time: 14000,param: PLAYER},
    {func: gm.Update,time: 100,param: () => {
        $("#Berry").text(`Berries: ${PLAYER.berries}`)
        $("#Stick").text(`Sticks: ${PLAYER.sticks}`)
    }}
)



function gatherItems(): void {

    // the idea is to make separate "loot tables", kind of like how in minecraft you can get emeralds and bones,
    // or emeralds and bone meals, or diamonds and bones, etc.
    const randpool1 = Math.randInt(1,5)
    const randpool2 = Math.randInt(1,5)

    switch(randpool1) {
        case 1:
        case 2:
            PLAYER.berries++
            break
        case 3:
            break
        case 4:
            PLAYER.berries = PLAYER.berries + 2n
            break
        case 5:
            PLAYER.berries = PLAYER.berries + 3n
            break
    }
    switch (randpool2) {
        // make sticks much rarer than berries
        case 5:
            PLAYER.sticks++
            break
        default:
            console.log("nothing")
            break
    }
}




const gatherButton = new TimedButton(
    "Gather (timed)",
    "gatherTimed",
    gatherItems,
    "Gathers items after a short delay.",
    2000
)
gatherButton.assign("gatherButton")