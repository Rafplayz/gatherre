interface BigInt {
    toJSON: function
}
BigInt.prototype.toJSON = function() {return this.toString()}
export interface Player {
    berries: bigint;
    sticks: bigint;
}
export function getInitialPlayer() {
    return {
        berries: 0n,
        sticks: 0n,
    }
}