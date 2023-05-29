import { GamePlayer } from "../model/GamePlayer";
import { Territory } from "../model/Territory";
import Graph from "../services/Graph";
import Util from "../services/Util";

export class Board {

    public territories: Array<Territory> = [];
    public continents = {};
    public territoriesGraph: Graph;
    public territoryCards: number[] = [];
    public objectiveCards: number[] = [];

    init(territoryIds: number[], continents) {
        this.setInitialTerritoryCards(territoryIds)
        this.shuffleTerritorieyCards();
        this.continents = continents
        this.territoriesGraph = new Graph();
        this.setupGraph();
    }


    setupGraph() {
        // let result = []
        this.territories.forEach(territory => {
            this.territoriesGraph.addVertex(territory.id)
            territory.neighbors.forEach(neighbor => {
                this.territoriesGraph.addEdge(
                    territory.id, neighbor
                )
            })
        })
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

    checkFortifyCondition(territory: Territory, player: GamePlayer | undefined) {
        if(territory.isHighlighted){
            let origin = this.getSelected()
            this.fortify(origin, territory)
        }else if(territory.owner?.id === player?.id){
            this.clearBoard()
            territory.select()
            territory.highlightOwnedNeighbors(this.territories)
        }else if(this.hasSelectedTerritory()){
            console.log("Movimento inválido")
        }
    }

    fortify(origin: Territory, destiny: Territory) {
        if(origin.armies > 1){
            origin.unplaceArmies(1);
            destiny.placeArmies(1);
            console.log("alocando")
            this.clearBoard();
        }else{
            console.log("Movimento inválido")
        }
    }

    checkTotality(player: GamePlayer | undefined) {
        Object.keys(this.continents).forEach(key => {
            if(this.hasTotality(player, key)){
                player?.setPlaceble(this.continents[key].slug, this.continents[key].totality)
                console.log(player?.placeble)
            }
        })
    }

    hasTotality(player:GamePlayer, continent) {
        // console.log(this.continents[continent].slug)
        let totalTerritoriesInContinent = this.territories.filter(territory =>{
            return territory.continent === parseInt(continent)
        }).length
        let totalPlayerTerritoriesInContinent = this.getPlayerTerritories(player).filter(territory =>{
            return territory.continent === parseInt(continent)
        }).length
        // console.log(totalTerritoriesInContinent, totalPlayerTerritoriesInContinent)
        return totalTerritoriesInContinent === totalPlayerTerritoriesInContinent
    }

    getPlayerTerritories(player:GamePlayer){
        
        const territoriesOwned =  this.territories.filter((territory) =>{
            return territory.owner?.id === player.id
        })
        return territoriesOwned
    }
}