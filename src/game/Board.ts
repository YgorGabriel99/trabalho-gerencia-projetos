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


}