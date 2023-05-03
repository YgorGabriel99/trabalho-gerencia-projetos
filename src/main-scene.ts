import Phaser from "phaser";
import loadCountries from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";

const COLORS = {
    'black': 0x000000,
    'green': 0xff0000
}
export class MainGameScene extends Phaser.Scene {

    public warMatch!: WarMatch;
    constructor() {
        super('MainGameScene');
    }

    preload():void{
        //Carregando os territórios
        let territorios = this.load.atlas('territorios', 
        '../assets/images/mapa_war.png',
        '../assets/images/mapa_war.json')

        //Carregando a fonte
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        
        //Carregando dados do mapa
        this.load.json('frame', 'assets/images/mapa_war.json');
        
        this.warMatch = new WarMatch(new Turn(2));
        this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Paulo"},"black"))
        this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Tiago"}, "green"))
        this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Rafa"}, "yellow"))

        
        
    }
    
    create(): void {
        //Selecionando as cores dos jogadores
        console.log(this.warMatch)
        console.log(COLORS['green'])
        loadCountries(this);
        console.log(this)
    }

    update(time: number, delta: number): void {

    }
}