const updateInterval = setInterval(Update,100)
let berries: number
/* 
REPLACE
THIS
*/
berries = 1

function gatherItems(): void{
    console.log("gatherItems received")
    berries++
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
    updateElement("main",`Berries: ${berries}`)
}
function updateElement(elementID: string,text: string) {
    let elem = document.getElementById(elementID)
    if(elem == null) throw new Error("elementID must be a valid ID")
    elem.innerText = text
}