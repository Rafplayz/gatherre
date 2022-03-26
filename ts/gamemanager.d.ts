
declare module 'gamemanager' {
    function getInitialPlayer():Player
    function getVersionString(version: Player["VERSION"]):string
    function initTimeouts(saveInfo:timeOut,updateInfo: timeOut):void
    function errorPopup(error: string|Error):void
    function savePopup():void
    function inGameErrorHandle(error:any):void
    function save(player:Player):string
    function load():Player
    function Update():void
    function colRight(button:JQuery<HTMLElement>):JQuery<HTMLElement>
    function unCol(button:JQuery<HTMLElement>):JQuery<HTMLElement>
}