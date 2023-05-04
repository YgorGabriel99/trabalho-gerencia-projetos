import { Player } from "./Player";

export class GamePlayer extends Player{
    // public cards: Array<Car
    public color: string;
    public type: integer = 0;
    constructor(data:Player, color: string) {
        super(data);
        this.color = color;
    }
}