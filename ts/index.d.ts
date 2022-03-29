declare global {
    interface Math {
        randInt(min:number,max:number):number
    }
    interface BigInt {
        toJSON():string
    }
    interface Player {
        [key:string]: any
        VERSION: {
            number: string
            isBeta: boolean
            isPrerelease: boolean
            name?: string
        }
        v: {
            berries: Value<bigint>
            sticks: Value<bigint>
        }
        
    }
}
// easier to expand upon later
interface Value<T> {
    v: T
}