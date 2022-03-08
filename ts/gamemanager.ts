function errorPopup(error: string|Error):void {
    popupNumber++;

    const PopupContainer = $(".popupContainer")
    PopupContainer.append($(`<div id="Error${popupNumber}" class="errorpopup"></div>`))
    
    const newElement = $(`#Error${popupNumber}`)

    if(typeof error != 'string') error = error.toString()

    newElement.text("There was an error processing game logic. Please report the following: " + error)
    .css({opacity:1})

    setTimeout(() => newElement.fadeOut(2000,'linear',function(){
        this.remove()
    })
    ,5000)
    
    console.error(error)
}
function savePopup():void {
    popupNumber++
    const PopupContainer = $('.popupContainer')
    PopupContainer.append($(`<div id="savePopup${popupNumber}" class="savePopup">Saved game</div>`))
    $(`#savePopup${popupNumber}`)
    .css({opacity:1})
    .fadeOut(2000,'linear',function(){this.remove()})
}
function inGameErrorHandle(error: any):void{
    if(typeof error !== 'string') {console.log(error.toString());return}
    console.log(error)
    errorPopup(error)
}
function saveTimeoutHandler():void {
    const currentDate = Date.now()
    if(saveDateCheck === undefined) saveDateCheck = currentDate
    if ((currentDate - saveDateCheck >= 14000)){
        save();
        console.log("saved")
    }
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(saveTimeoutHandler,14000)
}
function save():string {
    const storedPlayer = JSON.stringify(player)
    window.localStorage.setItem('player',storedPlayer)
    savePopup()
    return storedPlayer
}
function clearSave():void {
    const userIn = prompt('Doing this will reset all your data from the start. Type "YES" below to confirm.')
    if(userIn === "YES") {
        window.localStorage.setItem('player','reset')
        document.location.reload()
    }
    else {
        return
    }
}
async function load():Promise<unknown> {
    return new Promise((resolve,reject) => {
        const localStoredPlayer = localStorage.getItem('player')
        if(localStoredPlayer == undefined || 'wiped'){player = getInitialPlayer();return}
        try {
            player = JSON.parse(localStoredPlayer)
            resolve(player)
        }
        catch(err) {
            reject(err)
        }
    })

}
function Update():void {
    const currentDate = Date.now();
    if (updateDateCheck === undefined)
        updateDateCheck = currentDate;
    if ((currentDate - updateDateCheck >= 100)) {
        $("#Berry").text(`Berries: ${player.berries}`);
        $("#Stick").text(`Sticks: ${player.sticks}`)
    }
    updateDateCheck = Date.now();
    updateInterval = setTimeout(Update, 100);
}
