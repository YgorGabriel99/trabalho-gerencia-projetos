import { GamePlayer } from "../model/GamePlayer";

export default class IconeCarta extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any}) {
        let { scene, x,y,fundo} = data;
        let spriteCarta = new Phaser.GameObjects.Sprite(scene, 920, 30, 'carta').setOrigin(0);
      
        spriteCarta.setInteractive()

        super(scene,x,y ,[spriteCarta]);
        spriteCarta.on("pointerover", (pointer, objeto)=>{
            spriteCarta.on("pointerdown", (pointer, objeto)=>{
                //evento do click
            })
            spriteCarta.setAlpha(0.7);
            
        })
        spriteCarta.on("pointerout", (pointer, objeto)=>{
            spriteCarta.setAlpha(1);
        })
        this.scene.add.existing(this);

    }
}