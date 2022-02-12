"use strict";
class TimedButton extends Button {
    constructor(title, id, effect, desc = "", timer) {
        super(title, id, effect, desc);
        this.activated = false;
        this.isIterating = false;
        this.timer = timer;
        TimedButton.instances.push(this);
    }
    click(buttonID = this.id) {
        let button = TimedButton.getTimedButtonById(buttonID);
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
            if (i != 1) {
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
            return err;
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
        catch (_a) {
            return null;
        }
        return button;
    }
    assign(element) {
        var _a;
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
        const progressbar = (_a = newElement.parentElement) === null || _a === void 0 ? void 0 : _a.children.namedItem("TimedButtonBar");
        this.progressbar = progressbar;
        return newElement;
    }
}
TimedButton.instances = [];
