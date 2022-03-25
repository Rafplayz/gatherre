declare global {
    interface Math {
        randInt(min:number,max:number):number
    }
    interface BigInt {
        toJSON():string
    }
}