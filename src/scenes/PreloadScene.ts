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

        
        this.load.image('barra_azul', 'assets/images/icon_retangulo_azul.png');
        this.load.image('ellipse', 'assets/images/ellipse.png');
        this.load.image('carta', 'assets/images/icon_cartas.png');
        this.load.image('computer', 'assets/images/icon_computer.png');
        this.load.image('musica', 'assets/images/icon_musica.png');
        this.load.image('objetivo', 'assets/images/icon_objetivo.png');
        this.load.image('retangulo_pequeno', 'assets/images/icon_retangulo_pequeno.png');
        this.load.image('sair', 'assets/images/icon_sair.png');
        this.load.image('segurança', 'assets/images/icon_seguranCa.png');
        this.load.image('volume', 'assets/images/icon_volume.png');
        this.load.image('retangulo_arredondado', 'assets/images/retangulo_arredondado.png');
        this.load.image('retangulo_branco', 'assets/images/Retangulo_branco.png');
        this.load.image('pessoa', 'assets/images/pessoa.png');
    }

    create(){
        this.scene.start('MainGameScene')
    }
}