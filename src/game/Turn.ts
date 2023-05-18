export class Turn{
    public totalPlayers: number = 0;
    public currentPlayer: number = 0;
    public moves: number = 0;
    public playersOrders: number[] = [];
    public currentPhase: number = -1;
    public phases: string[] = ["mobilizar","atacar","fortificar"];

    constructor(totalPlayers: number) {
        this.totalPlayers = totalPlayers;
    }



}