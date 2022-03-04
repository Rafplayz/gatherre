interface Player {
    berries: bigint;
    sticks: bigint;
}
function getInitialPlayer() {
    return {
        berries: 0n,
        sticks: 0n,
    }
}