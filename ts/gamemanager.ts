import {Player,getInitialPlayer} from 'Player'
export let saveTimeout: number
export let updateInterval: number
export let popupNumber = 0
export let updateDateCheck: number
type timeOut = {
    func: Function
    time: number
    param: any
}

export function initTimeouts(saveInfo:timeOut,updateInfo: timeOut) {
    saveTimeout = setTimeout(saveInfo.func,saveInfo.time,saveInfo.param)
    updateInterval = setTimeout(updateInfo.func,updateInfo.time,updateInfo.param)
    //$("#Berry").text(`Berries: ${player.berries}`);
    //$("#Stick").text(`Sticks: ${player.sticks}`)
}
export function errorPopup(error: string|Error): void {
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
export function savePopup(): void {
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
export function inGameErrorHandle(error: any): void {
    if(typeof error !== 'string') {console.log(error.toString());return}
    console.log(error)
    errorPopup(error)
}
export function saveTimeoutHandler(player:Player):void {
    let saveDateCheck
    const currentDate = Date.now()
    if(saveDateCheck === undefined) saveDateCheck = currentDate
    if ((currentDate - saveDateCheck >= 14000)){
        save(player);
        console.log("saved")
    }
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(saveTimeoutHandler,14000)
}
export function save(player: Player): string {
    const storedPlayer = JSON.stringify(player)
    window.localStorage.setItem('player',storedPlayer)
    savePopup()
    return storedPlayer
}
export function clearSave(): void {
    const userIn = prompt('Doing this will reset all your data from the start. Type "YES" below to confirm.')
    if(userIn === "YES") {
        window.localStorage.setItem('player','reset')
        document.location.reload()
    }
    else {
        return
    }
}
export function load(): Player {
    let player: Player
    const localStoredPlayer = <Player>(<unknown>localStorage.getItem('player'))
    if(localStoredPlayer == undefined || 'wiped'){player = getInitialPlayer()}
    else player = localStoredPlayer
    return player
}
export function Update(textUpdate: Function): void {
    const currentDate = Date.now();
    if (updateDateCheck === undefined)
        updateDateCheck = currentDate;
    if ((currentDate - updateDateCheck >= 100)) {
        textUpdate()
    }
    updateDateCheck = Date.now();
    updateInterval = setTimeout(Update, 100);
}
