import { WarMatch } from "../game/WarMatch";
import PlayerType, { Player } from "./Player";

export enum playerCOLORS  {
    'black' = 0x4f4f4d,
    'green' = 0x13a95b,
    'yellow' = 0xe9ae02,
    'blue' = 0x1a54a5,
    'pink' = 0xde2587,
    'red' = 0xec3829,
}

export interface Placeble{
    "all": number
}

export interface Placed {
    "all": number
}

export class GamePlayer extends Player{
    
    // public cards: Array<Car
    public color: number;
    public totalArmies: number;
    public totalTerritories: number;
    public playerText: Phaser.GameObjects.Text;
    public armies
    public placed: Placed = {"all":0}
    public placeble: Placeble = {"all":0}
    warMatch: WarMatch;
    
    // public ia: boolean;
    constructor(data:PlayerType, color: number, warMatch: WarMatch) {
        super(data);
        this.color = color;
        this.warMatch = warMatch;
    }

    destroyPlayerText(){
        this.playerText.destroy()
    }

    showGamePlayer(x: number, y: number, currentPlayerId:number, scene:Phaser.Scene) {
        let isCurrentPlayer = currentPlayerId === this.id;
        this.playerText = scene.add.text(x,y,`${this.name} ⚒: ${this.totalArmies} ⦻: ${this.totalTerritories}`)
        .setColor(`#${this.color.toString(16)}`)
        if(isCurrentPlayer){
            this.playerText.setBackgroundColor("#ffffff55")
        }
        this.playerText.setInteractive( { useHandCursor: true  } );

        this.playerText.on("pointerdown",()=>{
            //Mostrar os dados do jog, etc
        })
    }

    isCurrentPlayer(){
        return this.id === this.warMatch.turn.getCurrentPlayerId()
    }

    setPlaceble(type:string, quantity:number){
        this.placeble[type] = quantity;
    }

    placeArmie(type:string, quantity:number){
        if(this.hasArmiesToPlace()){
            this.placeble[type] -= quantity;
            this.placed[type] += quantity;
        }
    }

    unplaceArmie(type:string, quantity:number){
        // if(this.placeble)
        this.placeble[type] += quantity;
        this.placed[type] -= quantity;
    }

    clearPlaced() {
        Object.keys(this.placed).forEach(key =>{
            this.placeble[key] = 0;
            this.placed[key] = 0;
        })
    }

    hasArmiesToPlace(){
        if(this.placeble.all > 0){
            return true
        }
        return false
    }

    resetPlaced(){
        this.placed.all = 0
    }
}