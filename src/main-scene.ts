import Phaser from "phaser";

export class MainGameScene extends Phaser.Scene {

    constructor() {
        super('MainGameScene');
    }

    preload():void{
        let territorios = this.load.atlas('territorios', 
        '../assets/images/mapa_war.png',
        '../assets/images/mapa_war.json')
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        this.load.json('frame', 'assets/images/mapa_war.json');
        // and later in your game ...
        
    }

    create():void{
        let data = this.cache.json.get('frame');

        //América do Sul
        let brasil = this.add.sprite(0,0, 'territorios', 'brasil').setOrigin(0,0).setScale(0.5)
        // console.log(brasil.frame.name) 
        let venezuela = this.add.sprite(0,0, 'territorios', 'venezuela').setOrigin(0).setScale(0.5) 
        let argentina = this.add.sprite(0,0, 'territorios', 'argentina').setOrigin(0).setScale(0.5)  
        let bolivia = this.add.sprite(0,0, 'territorios', 'bolivia').setOrigin(0).setScale(0.5) 
        
        //Europa
        let alemanha = this.add.sprite(0,0, 'territorios', 'alemanha').setOrigin(0).setScale(0.5) 
        let franca = this.add.sprite(0,0, 'territorios', 'franca').setOrigin(0).setScale(0.5) 
        let islandia = this.add.sprite(0,0, 'territorios', 'islandia').setOrigin(0).setScale(0.5)
        let suecia = this.add.sprite(0,0, 'territorios', 'suecia').setOrigin(0).setScale(0.5) 
        let italia = this.add.sprite(0,0, 'territorios', 'italia').setOrigin(0).setScale(0.5)  
        let moscou = this.add.sprite(0,0, 'territorios', 'moscou').setOrigin(0).setScale(0.5)
        
        //África
        let sudao = this.add.sprite(0,0, 'territorios', 'sudao').setOrigin(0).setScale(0.5) 
        let congo = this.add.sprite(0,0, 'territorios', 'congo').setOrigin(0).setScale(0.5) 
        let argelia = this.add.sprite(0,0, 'territorios', 'argelia').setOrigin(0).setScale(0.5)
        let madasgacar = this.add.sprite(0,0, 'territorios', 'madagascar').setOrigin(0).setScale(0.5)  
        let egito = this.add.sprite(0,0, 'territorios', 'egito').setOrigin(0).setScale(0.5) 
        let africa_do_sul = this.add.sprite(0,0, 'territorios', 'africa-do-sul').setOrigin(0).setScale(0.5) 

        //América do Norte
        let groenlandia = this.add.sprite(0,0, 'territorios', 'groenlandia').setOrigin(0).setScale(0.5) 
        let mackenzie = this.add.sprite(0,0, 'territorios', 'mackenzie').setOrigin(0,0).setScale(0.5)
        let inglaterra = this.add.sprite(0,0, 'territorios', 'inglaterra').setOrigin(0).setScale(0.5) 
        let ottawa = this.add.sprite(0,0, 'territorios', 'ottawa').setOrigin(0).setScale(0.5) 
        let phaser = this.add.sprite(0,0, 'territorios', 'phaser').setOrigin(0).setScale(0.5) 
        let nova_iorque = this.add.sprite(0,0, 'territorios', 'nova-iorque').setOrigin(0).setScale(0.5)
        let mexico = this.add.sprite(0,0, 'territorios', 'mexico').setOrigin(0).setScale(0.5) 
        let california = this.add.sprite(0,0, 'territorios', 'california').setOrigin(0).setScale(0.5)  
        let vancouver = this.add.sprite(0,0, 'territorios', 'vancouver').setOrigin(0).setScale(0.5)
        let labrador = this.add.sprite(0,0, 'territorios', 'labrador').setOrigin(0).setScale(0.5) 
        let alasca = this.add.sprite(0,0, 'territorios', 'alasca').setOrigin(0).setScale(0.5) 
         
        //Ásia
        let aral = this.add.sprite(0,0, 'territorios', 'aral').setOrigin(0).setScale(0.5) 
        let siberia = this.add.sprite(0,0, 'territorios', 'siberia').setOrigin(0).setScale(0.5) 
        let india = this.add.sprite(0,0, 'territorios', 'india').setOrigin(0).setScale(0.5) 
        let vietna = this.add.sprite(0,0, 'territorios', 'vietna').setOrigin(0).setScale(0.5)
        let china = this.add.sprite(0,0, 'territorios', 'china').setOrigin(0).setScale(0.5) 
        let mongolia = this.add.sprite(0,0, 'territorios', 'mongolia').setOrigin(0).setScale(0.5)  
        let vladivostok = this.add.sprite(0,0, 'territorios', 'vladivostok').setOrigin(0).setScale(0.5) 
        let dudinka = this.add.sprite(0,0, 'territorios', 'dudinka').setOrigin(0).setScale(0.5) 
        let omsk = this.add.sprite(0,0, 'territorios', 'omsk').setOrigin(0).setScale(0.5) 
        let tchita = this.add.sprite(0,0, 'territorios', 'tchita').setOrigin(0).setScale(0.5) 
        let japao = this.add.sprite(0,0, 'territorios', 'japao').setOrigin(0).setScale(0.5) 

        //Oceania
        let australia = this.add.sprite(0,0, 'territorios', 'australia').setOrigin(0).setScale(0.5) 
        let nova_guine = this.add.sprite(0,0, 'territorios', 'nova-guine').setOrigin(0).setScale(0.5) 
        let sumatra = this.add.sprite(0,0, 'territorios', 'sumatra').setOrigin(0).setScale(0.5) 
        let borneo = this.add.sprite(0,0, 'territorios', 'borneo').setOrigin(0).setScale(0.5) 
        // let mackenzie = this.add.sprite(0,0, 'territorios', 'mackenzie').setOrigin(0) 
        // let argentina = this.add.sprite(0,0, 'territorios', 'argentina').setOrigin(0) 
        // let font = this.add.bitmapText(0, 0, 'pressstart', 'Canção de war')

        
        // console.log(data.frames['brasil'])
        

    }

    update(time: number, delta: number): void {

    }
}