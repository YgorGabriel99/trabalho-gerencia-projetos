import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";
import PlayerType from "./Player";
import { Territory } from "./Territory";

export default class IaPlayer extends GamePlayer{

    public coesionWeight = 1;
    public totalitynWeight = 1;
    public aggressiveWeight = 1;
    public survivalWeight = 1;
    public objectiveWeight = 1;

    constructor(data:PlayerType, color: number, warMatch: WarMatch) {
        super(data, color, warMatch);
    }

    cardExchange(){
        // alert("IA trocando cartas")
        //Analisar situação
        
        //Tomar decisão

    }

    mobilize(){
        // alert("IA mobilizando")
        //Mobilizando de formaaleatória
        Object.keys(this.placeble).forEach(place =>{
            let territories = this.warMatch.board.getTerritoriesByContinent(place, this)
            while(this.placeble[place] > 0){
                let index = Math.round(Math.random() * (territories.length-1))
                let territory = territories[index]
                territory.mobilize(this.warMatch.board.continents)
            }
        })
        
        //Analisar situação

        //Tomar decisão

    }

    attack(){
        // alert("IA atacando")
        //Analisar situação
        let attackerTerritories = this.warMatch.board.getPlayerTerritoriesGratherThanOne(this)
        // let defenderTerritories = this.warMatch.board.getBordersWithOponent(this)
        attackerTerritories.forEach(attacker =>{
            attacker.highlightNeighbours(this.warMatch.board.territories)
            while(this.warMatch.board.hasHighlightedTerritory(attacker) && attacker.armies > 1){
                attacker.select()
                let highlightedTerritories = this.warMatch.board.getHighlighted()
                let index = Math.round(Math.random() * (highlightedTerritories.length-1))
                this.warMatch.board.checkAttackCondition(highlightedTerritories[index], attacker.owner)
                attacker.unhighlightNeighbours(this.warMatch.board.territories)
                attacker.highlightNeighbours(this.warMatch.board.territories)
            }
            this.warMatch.board.clearBoard()
        })
        
        //Tomar decisão
    }

    fortify(){
        // alert("IA fortificando")
        //Analisar situação

        //Tomar decisão
    }

}