
export class Territory extends Phaser.GameObjects.Container {
    
    public id: number;
    // textX: number;
    // textY: number;
    public name: string;
    public armies: number = 0;
    public scene: Phaser.Scene;
    public slug: string;
    public spriteTerritory: Phaser.GameObjects.Sprite;
    public armiesText: Phaser.GameObjects.BitmapText;
    public neighbors: number[];
    public isSelected: boolean = false;
    constructor(data: any) {
        let {id, name, slug, scene, x, y, spriteSource, neighbors} = data;
        let spriteTerritory = new Phaser.GameObjects.Sprite(scene, 0, 0, 'territorios', slug).setOrigin(0)
        .setDepth(-1)
        let textX = spriteSource['x'] + spriteSource['w']/2
        let textY = spriteSource['y'] + spriteSource['h']/2
        let armiesText = new Phaser.GameObjects.BitmapText(scene, textX, textY, 'pressstart', '0', 16, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setDepth(100)
        let territoryText = new Phaser.GameObjects.BitmapText(scene, textX - 20, textY - 20, 'pressstart', name, 10, Phaser.GameObjects.BitmapText.ALIGN_LEFT)
        .setDepth(10).setTintFill(0x000)
        
        super(scene, x, y, [spriteTerritory, armiesText, territoryText]);

        
        this.setInteractive(new Phaser.Geom.Circle(textX, textY, 45), Phaser.Geom.Circle.Contains)
        this.spriteTerritory = spriteTerritory;
        this.armiesText = armiesText;
        this.neighbors = neighbors;
        this.id = id;
        // this.textX = textX;
        // this.textY = textY;
        this.slug = slug;
        // this.sprite = sprite;
        this.name = name;
        this.scene = scene;
        this.scene.add.existing(this);
    }

    changeSelected():void{
        this.isSelected = !this.isSelected
    }

    public highlight():void{
        this.spriteTerritory.setTint(0xcfcfcf)
        this.spriteTerritory.setAlpha(0.8)
    }

    public flash():void{
        this.spriteTerritory.setTintFill(0xffffff)
        this.spriteTerritory.clearTint().clearAlpha()
    }
}