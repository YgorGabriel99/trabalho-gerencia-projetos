import PlayerType, { Player } from "./Player";

const playerCOLORS = {
    'black': 0x4f4f4d,
    'green': 0x03a95e,
    'yellow': 0xe9ae02,
    'blue': 0x1a54a5,
    'pink': 0xde2587,
    'red': 0xec3829,
}

export class GamePlayer extends Player{
    // public cards: Array<Car
    public color: number;
    public ia: boolean;
    constructor(data:PlayerType) {
        super(data);
        this.color = playerCOLORS[data.color];
    }
}