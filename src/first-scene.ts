import Phaser from 'phaser';
//import { createContadorImagem } from '/services/country.service';
import {createContadorImagem} from './services/country-services.ts';
/**
 * FirstGameScene is an example Phaser Scene
 * @class
 * @constructor
 * @public
 */
export class FirstGameScene extends Phaser.Scene {

    // private gameOver!: boolean;
    // private score!: number;
    // private platforms!: Phaser.Physics.Arcade.StaticGroup;
    // private player!: Phaser.Physics.Arcade.Sprite;
    // private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    // private stars!: Phaser.Physics.Arcade.Group;
    // private bombs!: Phaser.Physics.Arcade.Group;
    // private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super('FirstGameScene');
        console.log('FirstGameScene.constructor()');
    }

    preload() {
        console.log('FirstGameScene.preload');
        this.load.image('mapa', 'assets/mapa.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('circle', 'assets/score.png')
    }

    create() {
        console.log('FirstGameScene.create');
        // initialize variables
        let largura = window.screen.width;
        let altura = window.screen.height;
        let mapa = this.add.image(largura/2, altura/3, 'mapa');
        mapa.setScale(0.8);

        createContadorImagem(this,485, 290);
        createContadorImagem(this, 430, 290);
        createContadorImagem(this, 430, 240);
        createContadorImagem(this, 450, 340);
        /*
        var brasil = this.add.image(485,290, 'circle')
        brasil.setScale(0.05,0.05)
        brasil.setInteractive();
        let count = 0; // contador inicial
        let countText = this.add.text(485, 290, count.toString(), { font: '24px Arial' }); // texto para exibir o contador
        countText.setOrigin(0.5); // define a origem do texto para o centro da imagem

        brasil.on('pointerdown', () => { // adiciona um evento de clique na imagem
            count++; // atualiza o contador
            countText.setText(count.toString()); // atualiza o texto do contador
        });*/
    }

    update() {
        
    }

}
