import PlayerType, { Player } from "./Player";

export enum playerCOLORS  {
    'black' = 0x4f4f4d,
    'green' = 0x03a95e,
    'yellow' = 0xe9ae02,
    'blue' = 0x1a54a5,
    'pink' = 0xde2587,
    'red' = 0xec3829,
}

export class GamePlayer extends Player{
    // public cards: Array<Car
    public color: number;
    public totalArmies: number;
    public totalTerritories: number;
    public playerText: Phaser.GameObjects.Text;
    
    // public ia: boolean;
    constructor(data:PlayerType, color: number) {
        super(data);
        this.color = color;
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
    }    

}