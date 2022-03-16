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