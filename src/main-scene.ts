import Phaser from "phaser";
import loadCountries from './services/territory-factory'
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

    create(): void {
        loadCountries(this);
    }

    update(time: number, delta: number): void {

    }
}