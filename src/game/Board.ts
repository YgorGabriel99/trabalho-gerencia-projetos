import { GamePlayer } from "../model/GamePlayer";
import { Territory } from "../model/Territory";
import Util from "../services/Util";

export class Board {

    

    public territories: Array<Territory> = [];
    public territoryCards: number[] = [];
    public objectiveCards: number[] = [];

    init(territoryIds: number[]) {
        this.setInitialTerritoryCards(territoryIds)
        this.shuffleTerritorieyCards();
    }

    getTerritoryById(id: number){
        return this.territories.find(territory => territory.id === id);
    }


    shuffleTerritorieyCards() {
        this.territoryCards = Util.shuffle(
            this.territoryCards
        )
    }

    public setTerritories(territories: Array<Territory>):void{
        this.territories = territories
    }    

    public hasSelectedTerritory(): boolean{
        const selectedTerritories = this.territories.filter(territory =>{
                return territory.isSelected
            }
        )
        return selectedTerritories.length > 0
    }

    public hasHighlightedTerritory(): boolean{
        const highlightedTerritories = this.territories.filter(territory =>{
                return territory.isHighlighted
            }
        )
        return highlightedTerritories.length > 0
    }

    public clearBoard(): void{
        this.territories.forEach(territory =>{
            territory.isSelected = false
            territory.isHighlighted = false
            territory.updateTint()
            territory.updateText()
        })
    }

    public getSelected(): Territory {
        const selectedTerritories = this.territories.filter(territory =>{
                return territory.isSelected
            }
        )
        return selectedTerritories[0]
    }

    public getHighlighted(): Territory {
        const highlightedTerritories = this.territories.filter(territory =>{
                return territory.isHighlighted
            }
        )
        return highlightedTerritories[0]
    }

    setInitialTerritoryCards(territories: number[]){
        this.territoryCards = territories
    }

    hasTerritoryWIthoutOwner(){
        const woTerritory = this.territories.filter(territory =>{
            return territory.owner === undefined
        })
        return woTerritory.length > 0
    }

    checkAttackCondition(territory: Territory, player?: GamePlayer) {
        // Checar se é o dono
        if(territory.owner?.id === player?.id){
            this.clearBoard()
            territory.select()
            territory.highlightNeighbours(this.territories)
        }else if(territory.isHighlighted){
            let attacker = this.getSelected()
             this.attack(attacker, territory) 
        }else if(this.hasSelectedTerritory()){
            console.log("Ataque inválido")
        }
    }

    attack(attacker: Territory, defender: Territory){
        let attackQuantity = Math.min(attacker.armies - 1, 3)
        let defenseQuantity = Math.min(defender.armies, 3)
        // console.log(attacker.name, attackQuantity, defender.name, defenseQuantity)
        // console.log("Attacking")
        let attackResult = this.playDices(attackQuantity)
        let defenseResult = this.playDices(defenseQuantity)
        console.log(attackResult, defenseResult)
        let combatResult = this.checkAttackResults(attackResult, defenseResult)

        attacker.armies -= combatResult[0]
        defender.armies -= combatResult[1]

        if(defender.armies === 0){
            let transfer = attackQuantity - combatResult[0]
            // defender.owner = attacker.owner
            attacker.armies -= transfer
            defender.conquer(attacker.owner, transfer)
            attacker.owner.gainedTerritory = true
            // player.gainedTerritory = true
        }
        this.clearBoard()
    }

    checkAttackResults (attackResult:number[], defenseResult:number[])  {
        let attackLosses = 0
        let defenseLosses = 0
        let comparations = Math.min(attackResult.length, defenseResult.length)
        for (let i = 0; i < comparations; i++) {
            if(attackResult[i] > defenseResult[i]){
                defenseLosses++
            }else{
                attackLosses++
            }
        }
        console.log([attackLosses, defenseLosses])
        return [attackLosses, defenseLosses]
    }

    playDices(n:number){
        const results = Array.from({length: n}, () => Math.floor(Math.random() * 6) + 1);
        return results.sort((a,b)=> b - a)
    }


}