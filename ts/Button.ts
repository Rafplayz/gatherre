class Button {
    title: string
    id: string
    effect: Function
    desc: string
    static instances: Button[] = [];
    assignedID: string = ""
    constructor(title: string, id: string, effect: Function, desc = "") {
        this.title = title;
        this.id = id;
        this.effect = effect;
        this.desc = desc;
        Button.instances.push(this); // causes a memory leak if we do not remove instances when we are done
    }

    static getButtonById(buttonID: string) {
        let button: any = Button.instances.find(x => x.id === buttonID);
        if(button == undefined) throw new Error()
        return <Button>button;
    }
    click(buttonID: string = this.id) {
        let button: Button = Button.getButtonById(buttonID);
        try { button.effect(); }
        catch (err) { return err; }
        return button.effect
    }
    assign(element: string|HTMLElement) {
        let newElement: any = element;
        // type guarding
        if(typeof element == "string") newElement = document.getElementById(element)
        if(newElement == null) throw new Error()
        // assigning values to the new element.
        newElement.onclick = () => this.click(this.id)
        newElement.innerText = this.title
        newElement.id = this.id
        this.assignedID = newElement.id

        return newElement
    }
    // destroy(buttonID: string = this.id) {
        // let button:Button = Button.getButtonById(buttonID)
        // Button.instances.find(button)
    // }
}
