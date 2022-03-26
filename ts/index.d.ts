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
            berries: {
                v: bigint;
            }
            sticks: {
                v: bigint;
            }
        }
        
    }
}