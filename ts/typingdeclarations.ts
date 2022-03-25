interface Math {
    randInt(min:number,max:number):number
}
interface BigInt {
    toJSON():string
}
interface Player {
    VERSION: {
        number: string
        isBeta: boolean
        isPrerelease: boolean
        name?: string
    }
    berries: bigint;
    sticks: bigint;
}
Math.randInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
BigInt.prototype.toJSON = function() {
    return this.toString() +  "n"
}