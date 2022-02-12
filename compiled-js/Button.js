"use strict";
class Button {
    constructor(title, id, effect, desc = "") {
        this.assignedID = "";
        this.title = title;
        this.id = id;
        this.effect = effect;
        this.desc = desc;
        Button.instances.push(this); // causes a memory leak if we do not remove instances when we are done
    }
    static getButtonById(buttonID) {
        let button = Button.instances.find(x => x.id === buttonID);
        if (button == undefined)
            throw new Error();
        return button;
    }
    click(buttonID = this.id) {
        let button = Button.getButtonById(buttonID);
        try {
            button.effect();
        }
        catch (err) {
            return err;
        }
        return button.effect;
    }
    assign(element) {
        let newElement = element;
        // type guarding
        if (typeof element == "string")
            newElement = document.getElementById(element);
        if (newElement == null)
            throw new Error();
        // assigning values to the new element.
        newElement.onclick = () => this.click(this.id);
        newElement.innerText = this.title;
        newElement.id = this.id;
        this.assignedID = newElement.id;
        return newElement;
    }
}
Button.instances = [];
