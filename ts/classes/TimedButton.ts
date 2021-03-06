import * as gm from '../main/gamemanager.js'
import Button from './Button.js'
export default class TimedButton extends Button {
    timer: number
    private isIterating = false
    /******************************************
     * Progressbar attached to  the TimedButton element.
    ******************************************/
    private _progressbar?: HTMLElement
    public get progressbar(): HTMLElement|undefined {
        return this._progressbar
    }
    public set progressbar(value: HTMLElement | undefined) {
        this._progressbar = value
    }
    /******************************************
     * All instances of TimedButtons.
     * @private Access via TimedButton.instances
    *******************************************/
    private static _instances: TimedButton[] = []

    public static get instances(): TimedButton[] {
        return TimedButton._instances
    }
    public static set instances(value: TimedButton[]) {
        TimedButton._instances = value
    }
    constructor(title: string, id: string, effect: Function, desc = "", timer: number) {
        super(title,id,effect,desc)
        this.timer = timer
        TimedButton.instances.push(this)
    }
    public override click(buttonID: string = this.id): void|unknown {
        const button = TimedButton.getTimedButtonById(buttonID)
        if(button == undefined) throw new Error()
        if (button.isIterating == false) button.isIterating = true
        else return
        try {
            if (button.assignedID == "") return
            setTimeout(button.effect,button.timer)
            let elem = this.progressbar
            let width = 1
            let i = 0
            if (i !== 1) { // if there is a better way to do this please let me know
                i = 1
                function frame(button: TimedButton): void {
                    if (width >= 100) {
                        button.isIterating = false
                        clearInterval(id);
                        i = 0;
                    } 
                    else {
                        if (elem == null) throw new Error()
                        width++;
                        elem.style.width = width + "%";
                    }
                }
                let id = setInterval(frame, button.timer / 100, button);
            }
        }
        catch(err) {
            gm.inGameErrorHandle(err)
        }
    }
    public static getTimedButtonById(buttonID: string) {
        let button: TimedButton
        try {
            let unsafe = TimedButton.instances.find(x => x.id === buttonID);
            if(unsafe == undefined) throw new Error()
            button = unsafe
        }
        catch {
            return null
        }
        return button;
    }
    public override assign(element: string|HTMLElement) {
        let newElement: any = element;
        // type guarding
        if(typeof element == "string") newElement = document.getElementById(element)
        if(newElement == null) throw new Error()
        // assigning values to the new element.
        newElement.onclick = () => this.click()
        newElement.innerText = this.title
        newElement.id = this.id
        this.assignedID = newElement.id
        // TimedButton specific: 
        const progressbar = <HTMLElement>newElement.parentElement?.children.namedItem("TimedButtonBar")
        this.progressbar = progressbar

        return newElement
    }
}