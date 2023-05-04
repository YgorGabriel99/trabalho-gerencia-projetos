import { Player } from "./Player";

export class GamePlayer extends Player{
    // public cards: Array<Car
    public color: number;
    public type: integer = 0;
    constructor(data:Player, color: number) {
        super(data);
        this.color = color;
    }
}