import { GamePlayer } from "../model/GamePlayer";
import { Turn } from "./Turn";

export class WarMatch{
    public players: Array<GamePlayer> = [];
    public turn: Turn;
    constructor(turn: Turn) {
        this.turn = turn;
    }

    getTotalPlayers(): number {
        return this.players.length;
    }

    addPlayer(player: GamePlayer): void {
        this.players.push(player);
    }
}