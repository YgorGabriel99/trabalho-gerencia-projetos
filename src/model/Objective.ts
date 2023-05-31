import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import { GamePlayer, playerCOLORS } from "./GamePlayer";
import { Territory } from "./Territory";

export default class Objective{
    owner: GamePlayer;
    warMatch: WarMatch;
    id: number;
    description: string;
    target: "continent" | "gamePlayer" | "territory";
    condition: {}
    type: "conquer" | "destroy";
    slug: any;

    constructor(warMatch: WarMatch, owner:GamePlayer, data) {
        let {id, type, description, slug, condition, targetType} = data
        this.warMatch = warMatch;
        this.owner = owner;
        this.id = id;
        this.condition = condition;
        this.type = type
        this.slug = slug
        this.description = description
        this.target = targetType
        
        // console.log(this)
    }

    static checkVictoryCondition(warMatch: WarMatch, data){
        let player: GamePlayer = warMatch.getCurrentPlayer()
        let fnString = `${player.objective.type}`
        // let condition = warMatch.board.objectives[warMatch.getCurrentPlayer()?.objective.id].condition
        let objective = player.objective
        Objective[fnString].apply(this, [
            warMatch,
            objective, 
            data
        ]);

        

        if(data.defender && data.defender.aimer !== data.attacker && data.defender.hasBeenDestroyed()){
            console.log("Nao destruiu")
            warMatch.board.resetObjective(warMatch, data.defender.aimer)
        }
    }

    static destroy(warMatch:WarMatch, objective:Objective, data:{attacker: GamePlayer, defender: GamePlayer, }){
        console.log("rodando destroy")
        /* Se possui o exército da cor ou tiver sido destruído por outro, muda a condição
        
        */
        //Verifica se está na fase de ataque e se a cor do defensor é igual a cor de ataque do atacante
        if(data.attacker){
            if(data.attacker === data.defender.aimer && 
                data.defender.hasBeenDestroyed()){
                data.defender.destroyed = true;
                alert(`Player: ${data.attacker.name} ganhou`)
                eventsCenter.emit("game-finished", data.attacker)
            }
        }

    }    



    static conquer(condition, data, warMatch){
        
    }    
}