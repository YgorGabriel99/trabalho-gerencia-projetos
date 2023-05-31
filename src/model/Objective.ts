import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";

export default class Objective{
    owner: GamePlayer;
    warMatch: WarMatch;
    id: number;

    constructor(warMatch: WarMatch, owner:GamePlayer, id: number) {
        this.warMatch = warMatch;
        this.owner = owner;
        this.id = id;
    }

    static checkVictoryCondition(objectiveSlug: string, warMatch: WarMatch){
        
    }
    
    
}