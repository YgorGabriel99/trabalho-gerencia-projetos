import Phaser from "phaser";
import loadCountries, { TerritoryFactory } from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from "./model/Territory";

// const COLORS = {
//     'black': 0x000000,
//     'green': 0xff0000,
//     'yellow': 0xe9ae02
// }
export class MainGameScene extends Phaser.Scene {

    // public warMatch!: WarMatch;
    constructor() {
        super('MainGameScene');
    }

    preload():void{
        //Carregando os territórios
        let territorios = this.load.aseprite('territorios', 
        '../assets/images/mapa_war.png',
        '../assets/images/mapa_war.json')

        //Carregando a fonte
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        
        // //Carregando dados do mapa
        let data = this.load.json('frame', 'assets/images/mapa_war.json');
        this.load.json('territories', 'assets/data/territories.json');
        // console.log(territories)
        
        // this.warMatch = new WarMatch(new Turn(2));
        // this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Paulo"},"black"))
        // this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Tiago"}, "green"))
        // this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Rafa"}, "yellow"))
        
    }
    
    create(): void {

        TerritoryFactory.loadCountries(this)

        this.input.on('gameobjectover', (pointer:Phaser.Input.Pointer, gameObject:Phaser.GameObjects.Sprite) =>
        {
            gameObject.setAlpha(0.5);
        });

        this.input.on('gameobjectout', (pointer:Phaser.Input.Pointer, gameObject:Phaser.GameObjects.Sprite) =>
        {
            gameObject.clearAlpha();
        });

        this.input.on('gameobjectdown', (pointer:Phaser.Input.Pointer, territory:Territory) =>{
            // territory.spriteTerritory.setTint(0xe9ae02)
        })

        this.input.on('gameobjectdown', (pointer:Phaser.Input.Pointer, territory:Territory) =>{
            if (territory.isSelected){
                territory.armies++
                territory.armiesText.setText(territory.armies.toString())
                territory.flash()
            }else{
                territory.highlight()
            }
            territory.changeSelected()
        })

    }

    update(time: number, delta: number): void {

    }
}