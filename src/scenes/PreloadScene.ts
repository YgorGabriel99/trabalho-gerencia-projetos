export default class PreloadScene extends Phaser.Scene{
    constructor() {
        super('PreloadScene')
    }

    preload(){
        //Carregando os territórios
        // let territorios = this.load.aseprite('territorios', 
        // '../assets/images/mapa_war.png',
        // '../assets/images/mapa_war.json')

        //Carregando a fonte
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        
        // //Carregando dados do mapa
        // let data = 
        this.load.json('frame', 'assets/images/mapa_war.json');
        this.load.json('territories', 'assets/data/territories.json');
        // console.log(territories)
    }

    create(){
        this.scene.start('MainGameScene')
    }
}