import * as gm from './gamemanager.js';
import { Button } from './Button.js';
export class TimedButton extends Button {
    constructor(title, id, effect, desc = "", timer) {
        super(title, id, effect, desc);
        this.isIterating = false;
        this.timer = timer;
        TimedButton.instances.push(this);
    }
    get progressbar() {
        return this._progressbar;
    }
    set progressbar(value) {
        this._progressbar = value;
    }
    static get instances() {
        return TimedButton._instances;
    }
    static set instances(value) {
        TimedButton._instances = value;
    }
    click(buttonID = this.id) {
        const button = TimedButton.getTimedButtonById(buttonID);
        if (button == undefined)
            throw new Error();
        if (button.isIterating == false)
            button.isIterating = true;
        else
            return;
        try {
            if (button.assignedID == "")
                return;
            setTimeout(button.effect, button.timer);
            let elem = this.progressbar;
            let width = 1;
            let i = 0;
            if (i !== 1) { // if there is a better way to do this please let me know
                i = 1;
                function frame(button) {
                    if (width >= 100) {
                        button.isIterating = false;
                        clearInterval(id);
                        i = 0;
                    }
                    else {
                        if (elem == null)
                            throw new Error();
                        width++;
                        elem.style.width = width + "%";
                    }
                }
                let id = setInterval(frame, button.timer / 100, button);
            }
        }
        catch (err) {
            gm.inGameErrorHandle(err);
        }
    }
    static getTimedButtonById(buttonID) {
        let button;
        try {
            let unsafe = TimedButton.instances.find(x => x.id === buttonID);
            if (unsafe == undefined)
                throw new Error();
            button = unsafe;
        }
        catch {
            return null;
        }
        return button;
    }
    assign(element) {
        let newElement = element;
        // type guarding
        if (typeof element == "string")
            newElement = document.getElementById(element);
        if (newElement == null)
            throw new Error();
        // assigning values to the new element.
        newElement.onclick = () => this.click();
        newElement.innerText = this.title;
        newElement.id = this.id;
        this.assignedID = newElement.id;
        // TimedButton specific: 
        const progressbar = newElement.parentElement?.children.namedItem("TimedButtonBar");
        this.progressbar = progressbar;
        return newElement;
    }
}
/******************************************
 * All instances of TimedButtons.
 * @private Access via TimedButton.instances
*******************************************/
TimedButton._instances = [];
