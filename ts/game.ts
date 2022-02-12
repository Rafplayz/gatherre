const updateInterval = setInterval(Update,100)
let total: number;4
function gatherItems(): void{
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
function Update(): void {
    updateElement("main",`Total: ${total}`)
}
function updateElement(elementID: string,text: string) {
    let elem = document.getElementById(elementID)
    if(elem == null) throw new Error("elementID must be a valid ID")
    elem.innerText = text
}