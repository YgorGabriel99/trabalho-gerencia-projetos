import Phaser from 'phaser';

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
    }

    create() {
        console.log('FirstGameScene.create');
        // initialize variables
        let largura = window.screen.width;
        let altura = window.screen.height;
        let mapa = this.add.image(largura/2, altura/3, 'mapa');
        mapa.setScale(0.8);
        
    }

    update() {
        
    }

}
