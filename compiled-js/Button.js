import * as gm from './gamemanager.js';
export class Button {
    constructor(title, id, effect, desc = "") {
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
            gm.inGameErrorHandle(err);
        }
    }
    assign(element) {
        let newElement = element; // has to be any or else below code doesn't compile
        if (typeof element === "string")
            newElement = document.getElementById(element);
        if (newElement == null)
            throw new Error();
        newElement.onclick = () => this.click(this.id);
        newElement.innerText = this.title;
        newElement.id = this.id;
        this.assignedID = newElement.id;
        return newElement;
    }
    destroy(buttonID = this.id) {
        let buttonToDestroy = Button.getButtonById(buttonID);
        let i = Button.instances.indexOf(buttonToDestroy); // gotta use the index to destroy it
        Button.instances.splice(i, 1);
    }
}
Button.instances = [];
