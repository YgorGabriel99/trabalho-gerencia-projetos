import { GamePlayer } from "../model/GamePlayer";
import { Territory } from "../model/Territory";
import PlayerType from "../scenes/InitGameScene";
import eventsCenter from "../services/EventsCenter";
import { Board } from "./Board";
import { Turn } from "./Turn";

enum Status {
    SETUP = 0,
    STARTED = 1,
    FINISHED = 2
}
export class WarMatch{
    
    
    public players: Array<GamePlayer> = [];
    public turn: Turn;
    public board: Board;
    public status: number = Status.SETUP
    constructor(board: Board,  turn: Turn) {
        this.turn = turn;
        this.board = board;
    }

    getTotalPlayers(): number {
        return this.players.length;
    }

    addPlayer(player: GamePlayer): void {
        this.players.push(player);
    }

    shufflePlayerInBoard(): void {
        this.board.territories.forEach((territory, index) =>{
            territory.setOwner(this.players[index % this.getTotalPlayers()])
        })
    }

    getPlayerTotalTerritories(player:GamePlayer):number{
        const territoriesOwned =  this.board.territories.filter((territory) =>{
            // console.log(territory.owner?.id)
            // console.log(player.id)
            return territory.owner?.id === player.id
        })
        return territoriesOwned.length
    }

    getPlayerTerritories(player:GamePlayer):Array<Territory> {
        const territoriesOwned =  this.board.territories.filter((territory) =>{
            // console.log(territory.owner?.id)
            // console.log(player.id)
            return territory.owner?.id === player.id
        })
        return territoriesOwned
    }

    //Está com erro no reduce !!!!!!!!!
    getPlayerTotalArmies(player:GamePlayer):number{
        const totalArmies = this.getPlayerTerritories(player).reduce(
            function(previousValue, currentValue:Territory){
                console.log(previousValue)
                console.log(currentValue.armies)
                return previousValue + currentValue.armies
            },0
        )
        console.log(totalArmies)
        return totalArmies
    }

    showPlayers(scene: Phaser.Scene) {
        let x = 600;
        let y = 20;
        this.players.forEach((player:GamePlayer, index:number) => {
            scene.add.bitmapText(
                x, 
                y + (index * 80),
                'pressstart',
                `${player.name} ${this.getPlayerTotalTerritories(player)} Territórios`, 
                24
            )
            .setTintFill(player.color)
        })
    }

    init(players: PlayerType) {
        
        players.forEach(player =>{
            this.addPlayer(new GamePlayer(player))
        })
        console.log(this)
        this.shufflePlayerInBoard()

        this.turn.init()

        eventsCenter.emit('showUI')
    }
}