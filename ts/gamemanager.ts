function errorPopup(error: string|Error) {
    popupNumber++;

    const PopupContainer = $(".popupContainer")
    PopupContainer.append($(`<div id="Error${popupNumber}" class="error popup"></div>`))
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
function savePopup(): void {
    popupNumber++
    const PopupContainer = $('.popupContainer')
    PopupContainer.append($(`<div id="savePopup${popupNumber}" class="save popup">Saved game</div>`))
    const prevSaveCount = Array.from(document.querySelectorAll('.save')).length
    $(`#savePopup${popupNumber}`)
    .css({opacity:1,top:prevSaveCount*36})
    .fadeOut(2000,'linear',function(){
        this.remove()
        document.querySelectorAll('.save').forEach((element,index) => {
            let e = element as HTMLElement
            e.style.top = (Number(e.style.top) - (36 * index)).toString()
        })
    })
}
function inGameErrorHandle(error: any) {
    if(typeof error !== 'string') {console.log(error.toString());return}
    console.log(error)
    errorPopup(error)
}
function saveTimeoutHandler() {
    const currentDate = Date.now()
    if(saveDateCheck === undefined) saveDateCheck = currentDate
    if ((currentDate - saveDateCheck >= 14000)){
        save();
        console.log("saved")
    }
    clearTimeout(saveInterval)
    saveInterval = setTimeout(saveTimeoutHandler,14000)
}
function save() {
    const storedPlayer = JSON.stringify(player)
    window.localStorage.setItem('player',storedPlayer)
    savePopup()
    return storedPlayer
}
function clearSave() {
    const userIn = prompt('Doing this will reset all your data from the start. Type "YES" below to confirm.')
    if(userIn === "YES") {
        window.localStorage.setItem('player','reset')
        document.location.reload()
    }
    else {
        return
    }
}
function load() {
    const localStoredPlayer = localStorage.getItem('player')
    if(localStoredPlayer == undefined || 'wiped'){player = getInitialPlayer();return}
    try {
    player = JSON.parse(localStoredPlayer)
    }
    catch(err) {
        console.error(err) // TODO: add an error popup
    }
}
function Update(): void {
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
