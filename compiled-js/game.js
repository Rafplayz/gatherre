"use strict";
const updateInterval = setInterval(Update, 100);
let berries;
/*
REPLACE
THIS
*/
berries = 1;
function gatherItems() {
    console.log("gatherItems received");
    berries++;
}
const gatherButton = new TimedButton("Gather (timed)", "gatherTimed", gatherItems, "Gathers items after a short delay.", 2000);
gatherButton.assign("gatherButton");
function Update() {
    updateElement("main", `Berries: ${berries}`);
}
function updateElement(elementID, text) {
    let elem = document.getElementById(elementID);
    if (elem == null)
        throw new Error("elementID must be a valid ID");
    elem.innerText = text;
}
