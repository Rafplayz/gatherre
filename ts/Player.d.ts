BigInt.prototype.toJSON = function() {
    return this.toString + "n"
}
export interface Player {
    VERSION: {
        number: string
        isBeta: boolean
        isPrerelease: boolean
        name?: string
    }
    berries: bigint;
    sticks: bigint;
}