import { Turn } from "../game/Turn";
import { GamePlayer } from "../model/GamePlayer";
import { Player } from "../model/Player";

export default class StatusJogador extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any;}) {
        let { scene, x,y,fundo,player} = data;
        let spriteFundo = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo).setOrigin(0).setAlpha(0.3);
        let spriteImage1 = new Phaser.GameObjects.Sprite(scene, 140,10, 'retangulo_branco').setOrigin(0);
        let spriteImage2 = new Phaser.GameObjects.Sprite(scene, 300,10, 'retangulo_branco').setOrigin(0);
        let spriteImage3 = new Phaser.GameObjects.Sprite(scene, 460,10, 'retangulo_branco').setOrigin(0);
        let spriteImage4 = new Phaser.GameObjects.Sprite(scene, 10,10, 'ellipse').setOrigin(0);
        let spriteBotao = new Phaser.GameObjects.Sprite(scene, 640,10, 'ellipse').setOrigin(0);
        let spriteSeguranca = new Phaser.GameObjects.Sprite(scene, 45,30, 'seguranca').setOrigin(0);
        let textName1 = new Phaser.GameObjects.BitmapText(scene,180,50,'pressstart', `ALOCANDO`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textName1.setTint(0)
        let textName2 = new Phaser.GameObjects.BitmapText(scene,340,50,'pressstart', `ATACANDO`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textName2.setTint(0)
        let textName3 = new Phaser.GameObjects.BitmapText(scene,480,50,'pressstart', `FORTALECENDO`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textName3.setTint(0)
        let textBotao = new Phaser.GameObjects.BitmapText(scene,660,55,'pressstart', `FINALIZAR`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textBotao.setTint(0)
        // let textName4 = new Phaser.GameObjects.BitmapText(scene,480,100,'pressstart', `Fase Atual: ${turn.phasesNames}`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        // textName4.setTint(0)
        
        
        console.log(scene,x,y,fundo)
        super(scene,x,y ,[spriteFundo,spriteImage1,spriteImage2,spriteImage3,spriteImage4,spriteBotao,spriteSeguranca,textName1,textName2,textName3, textBotao]);
      
        spriteBotao.setInteractive()
         
        spriteBotao.on("pointerover", (pointer, objeto)=>{
            spriteBotao.on("pointerdown", (pointer, objeto)=>{
                //passar de etapa
                
            })
            spriteBotao.setTint(0x13a95b);
            
        })
        spriteBotao.on("pointerout", (pointer, objeto)=>{
            spriteBotao.setTint(0xffffff);
        })

        this.scene.add.existing(this);

    }
}