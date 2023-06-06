import { playerCOLORS } from "../model/GamePlayer";

export default class PlayerContainer extends Phaser.GameObjects.Container {
    color: number;
    constructor(color:string, x:number, y:number, scene: Phaser.Scene){
        let spritePlayerContainer  = new Phaser.GameObjects.Sprite(scene, 0 ,0, 'player_container').setOrigin(0).setAlpha(0.5)
        let inputPlayerName = new Phaser.GameObjects.DOMElement(scene,x,y,'input',{background: '#csecse'},'alguma coisa')
        super(scene,x,y,[spritePlayerContainer, inputPlayerName])
        this.color = playerCOLORS[color]

        this.scene.add.existing(this);
    }
}