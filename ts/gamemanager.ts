const VERSION: Player["VERSION"] = {
    number: "0.0.0",
    isBeta: false,
    isPrerelease: false,
    name: "Indev",
}
import './typingdeclarations.js'
//tslint:disable-next-line
let saveTimeout: number
//tslint:disable-next-line
let updateInterval: number
let popupNumber = 0
let updateDateCheck: number
type timeOut = {
    func: Function
    time: number
    param: any
}
function getInitialPlayer() {
    return {
        VERSION: VERSION,
        v: {
            berries: {
                v: 0n,
            },
            sticks: {
                v: 0n
            },
        }
    }
}
export function getVersionString(version: Player["VERSION"]) {
    let {number, isBeta, isPrerelease, name} = version
    return (isBeta ? "Beta " : isPrerelease ? "Pre-release " : "") + number + " " + name ?? ""
}
export function initTimeouts(saveInfo:timeOut,updateInfo: timeOut) {
    saveTimeout = setTimeout(saveInfo.func,saveInfo.time,saveInfo.param)
    updateInterval = setTimeout(updateInfo.func,updateInfo.time,updateInfo.param)
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
    ,20000)

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
    saveTimeout = setTimeout(saveTimeoutHandler,14000,player)
}
export function save(player: Player): string {
    const storedPlayer = JSON.stringify(player)
    window.localStorage.setItem('player',storedPlayer)
    savePopup()
    return storedPlayer
}
export function load(): Player {
    let player: Player
    const bigIntRegEx = /[0-9]+n/g
    const NotBigIntRegEx = /"[0-9]+n"/g
    const localStorageVersion = localStorage.getItem('player')
    try {
    if (localStorageVersion == null || localStorageVersion == "undefined" || localStorageVersion == 'reset') {
        player = getInitialPlayer()
        return player
    }
    player = <Player>JSON.parse(localStorageVersion,(key,value) => {
        console.log(value)
        if(value == null) {
            return 0n
            
        }
        if(typeof value == "number") { // TODO: this is a bandaid. fix this later. 
            return BigInt(value) // what a brute force method.
        }
        if(value.toString().match(bigIntRegEx)) {
            if(value.toString().match(NotBigIntRegEx)) {
                return value
            }
            const newLocal = <bigint>value.toString().substring(0, value.toString().length - 1)
            return newLocal
        }
        else return value
    })
    
    return player
    }
    catch(err) {
        errorPopup("We've been unable to process your save file. Please wipe your save.") // TODO: set up a support channel on discord
        throw err
    }
}
export function Update(textUpdate: Function): void {
    if(typeof textUpdate !== 'function') throw 'Bruh'
    const currentDate = Date.now();
    if (updateDateCheck === undefined)
        updateDateCheck = currentDate;
    if ((currentDate - updateDateCheck >= 100)) {
        textUpdate()
    }
    updateDateCheck = Date.now();
    updateInterval = setTimeout(Update, 100, textUpdate);
}