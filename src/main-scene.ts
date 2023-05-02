import Phaser from "phaser";

export class MainGameScene extends Phaser.Scene {
    SCALE = 1
    ORIGIN = 0
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

        // console.log(typeof(data.frames))
        // console.log(data.frames)
        // data.frames.map(element =>{
        //     console.log(element)
        // })

        for(territory of data.frames.toArray()){
            console.log(territory)
        }
        
        // //América do Sul
        // let brasil = this.add.sprite(0,0, 'territorios', 'brasil').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // console.log(brasil.frame)
        // this.add.bitmapText(
        //     brasil.frame.x + brasil.frame.halfHeight, 
        //     brasil.frame.halfWidth + brasil.frame.y, 'pressstart', brasil.frame.name,15,1).setTint(0xeeeeee)

        // let venezuela = this.add.sprite(0,0, 'territorios', 'venezuela').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let argentina = this.add.sprite(0,0, 'territorios', 'argentina').setOrigin(this.ORIGIN).setScale(this.SCALE)  
        // let bolivia = this.add.sprite(0,0, 'territorios', 'bolivia').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        
        // //Europa
        // let alemanha = this.add.sprite(0,0, 'territorios', 'alemanha').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let franca = this.add.sprite(0,0, 'territorios', 'franca').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let islandia = this.add.sprite(0,0, 'territorios', 'islandia').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let suecia = this.add.sprite(0,0, 'territorios', 'suecia').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let italia = this.add.sprite(0,0, 'territorios', 'italia').setOrigin(this.ORIGIN).setScale(this.SCALE)  
        // let moscou = this.add.sprite(0,0, 'territorios', 'moscou').setOrigin(this.ORIGIN).setScale(this.SCALE)
        
        // //África
        // let sudao = this.add.sprite(0,0, 'territorios', 'sudao').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let congo = this.add.sprite(0,0, 'territorios', 'congo').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let argelia = this.add.sprite(0,0, 'territorios', 'argelia').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let madasgacar = this.add.sprite(0,0, 'territorios', 'madagascar').setOrigin(this.ORIGIN).setScale(this.SCALE)  
        // let egito = this.add.sprite(0,0, 'territorios', 'egito').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let africa_do_sul = this.add.sprite(0,0, 'territorios', 'africa-do-sul').setOrigin(this.ORIGIN).setScale(this.SCALE) 

        // //América do Norte
        // let groenlandia = this.add.sprite(0,0, 'territorios', 'groenlandia').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let mackenzie = this.add.sprite(0,0, 'territorios', 'mackenzie').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let inglaterra = this.add.sprite(0,0, 'territorios', 'inglaterra').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let ottawa = this.add.sprite(0,0, 'territorios', 'ottawa').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let phaser = this.add.sprite(0,0, 'territorios', 'phaser').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let nova_iorque = this.add.sprite(0,0, 'territorios', 'nova-iorque').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let mexico = this.add.sprite(0,0, 'territorios', 'mexico').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let california = this.add.sprite(0,0, 'territorios', 'california').setOrigin(this.ORIGIN).setScale(this.SCALE)  
        // let vancouver = this.add.sprite(0,0, 'territorios', 'vancouver').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let labrador = this.add.sprite(0,0, 'territorios', 'labrador').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let alasca = this.add.sprite(0,0, 'territorios', 'alasca').setOrigin(this.ORIGIN).setScale(this.SCALE) 
         
        // //Ásia
        // let aral = this.add.sprite(0,0, 'territorios', 'aral').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let siberia = this.add.sprite(0,0, 'territorios', 'siberia').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let india = this.add.sprite(0,0, 'territorios', 'india').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let vietna = this.add.sprite(0,0, 'territorios', 'vietna').setOrigin(this.ORIGIN).setScale(this.SCALE)
        // let china = this.add.sprite(0,0, 'territorios', 'china').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let mongolia = this.add.sprite(0,0, 'territorios', 'mongolia').setOrigin(this.ORIGIN).setScale(this.SCALE)  
        // let vladivostok = this.add.sprite(0,0, 'territorios', 'vladivostok').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let dudinka = this.add.sprite(0,0, 'territorios', 'dudinka').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let omsk = this.add.sprite(0,0, 'territorios', 'omsk').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let tchita = this.add.sprite(0,0, 'territorios', 'tchita').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let japao = this.add.sprite(0,0, 'territorios', 'japao').setOrigin(this.ORIGIN).setScale(this.SCALE) 

        // //Oceania
        // let australia = this.add.sprite(0,0, 'territorios', 'australia').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let nova_guine = this.add.sprite(0,0, 'territorios', 'nova-guine').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let sumatra = this.add.sprite(0,0, 'territorios', 'sumatra').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // let borneo = this.add.sprite(0,0, 'territorios', 'borneo').setOrigin(this.ORIGIN).setScale(this.SCALE) 
        // // let mackenzie = this.add.sprite(0,0, 'territorios', 'mackenzie').setOrigin(0) 
        // // let argentina = this.add.sprite(0,0, 'territorios', 'argentina').setOrigin(0) 
        // let font = this.add.bitmapText(100, 100, 'pressstart', 'War Game')

        
        // console.log(data.frames['brasil'])
        // console.log(data)
        // brasil.setAlpha(0.5)
        // brasil.setTint('#c3c3c3')
        this.add.bitmapText(350, 300, 'pressstart', 'Oceano \n Atlântico',15,1)
        this.add.bitmapText(800, 350, 'pressstart', 'Oceano \n Índico',15,1)
        this.add.bitmapText(100, 400, 'pressstart', 'Oceano \n Pacífico',15,1)
        

    }

    update(time: number, delta: number): void {

    }
}