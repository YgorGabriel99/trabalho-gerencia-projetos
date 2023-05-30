import { GamePlayer } from "../model/GamePlayer";

export default class ObjetivoJogador extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any}) {
        let { scene, x,y,fundo} = data;
        let spriteObjetivo = new Phaser.GameObjects.Sprite(scene, 780,10, 'ellipse').setOrigin(0);
        let spriteIconoBjetivo = new Phaser.GameObjects.Sprite(scene, 800,25, 'objetivo').setOrigin(0);
        let sprite1 = new Phaser.GameObjects.Sprite(scene, 820,25, 'objetivo').setOrigin(0);
       
        
        spriteObjetivo.setInteractive()

        super(scene,x,y ,[spriteObjetivo,spriteIconoBjetivo]);
        spriteObjetivo.on("pointerover", (pointer, objeto)=>{
            spriteObjetivo.on("pointerdown", (pointer, objeto)=>{
                super(scene,x,y ,[spriteObjetivo,spriteIconoBjetivo,sprite1]);
            })
            spriteObjetivo.setAlpha(0.7);
            
        })
        spriteObjetivo.on("pointerout", (pointer, objeto)=>{
            spriteObjetivo.setAlpha(1);
        })
        
        this.scene.add.existing(this);

    }
}