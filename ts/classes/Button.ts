import * as gm from '../main/gamemanager.js'
export default class Button {
    title: string
    id: string
    effect: Function
    desc: string
    static instances: Button[] = [];
    assignedID?: string
    constructor(title: string, id: string, effect: Function, desc = "") {
        this.title = title;
        this.id = id;
        this.effect = effect;
        this.desc = desc;
        Button.instances.push(this); // causes a memory leak if we do not remove instances when we are done
    }

    static getButtonById(buttonID: string): Button {
        let button: any = Button.instances.find(x => x.id === buttonID);
        if(button == undefined) throw new Error()
        return <Button>button;
    }
    click(buttonID: string = this.id): void {
        let button: Button = Button.getButtonById(buttonID);
        try {
        button.effect()
        }
        catch(err){gm.inGameErrorHandle(err)}
    }
    assign(element: string|HTMLElement): HTMLElement {
        let newElement: any = element; // has to be any or else below code doesn't compile

        if(typeof element === "string") newElement = document.getElementById(element)
        if(newElement == null) throw new Error()
        
        newElement.onclick = () => this.click(this.id)
        newElement.innerText = this.title
        newElement.id = this.id

        this.assignedID = newElement.id

        return newElement
    }
    destroy(buttonID: string = this.id): void {
        let buttonToDestroy = Button.getButtonById(buttonID)
        let i = Button.instances.indexOf(buttonToDestroy) // gotta use the index to destroy it
        Button.instances.splice(i,1)
    }
}
