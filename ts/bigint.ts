interface Math {
    randInt(min:number,max:number):number
}
interface BigInt {
    toJSON():string
}
Math.randInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
BigInt.prototype.toJSON = function() {
    return this.toString +  "n"
}