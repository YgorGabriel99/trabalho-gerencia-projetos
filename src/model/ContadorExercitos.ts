export default class ContadorExercitos extends Phaser.GameObjects.Container {
    public spriteFundo: Phaser.GameObjects.Sprite;
    public spriteImage: Phaser.GameObjects.Sprite;
    public slug: string;
    cardname: any;
    textName: Phaser.GameObjects.BitmapText;
    constructor(data: { scene: any; name: any; x: any; y: any; fundo: any; image: any; }) {
        let { scene, x,y,name,fundo,image } = data;
        let textName = new Phaser.GameObjects.BitmapText(scene,0,0,'pressstart', name, 16, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        let spriteFundo = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo,'aa').setOrigin(0);
        let spriteImage = new Phaser.GameObjects.Sprite(scene, 0,0, image , 'aaa').setOrigin(0);
        
        super(scene,x,y [spriteFundo, spriteImage, textName]);
        this.spriteFundo = spriteFundo;
        this.spriteImage = spriteImage;
        this.textName = textName;
        this.cardname = name;
        this.scene = scene;
        this.scene.add.existing(this);
    }
}