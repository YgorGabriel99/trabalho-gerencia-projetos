import PlayerType from "../model/Player";
import Util from "../services/Util";

enum Phases{
    MOBILIZAR = 0,
    ATACAR = 1,
    FORTIFICAR = 2
}
export class Turn{
    public totalPlayers: number = 0;
    public currentPlayer: number = 0;
    public moves: number = 0;
    public playersOrders: number[] = [];
    public currentPhase: number = -1;
    public phasesNames: string[] = ["Mobilizar","Atacar","Fortificar"];
    
    setTotalPlayers(){
        this.totalPlayers = this.playersOrders.length;
    }


    shufflePlayerOrder(players:number[]){
        this.playersOrders = Util.shuffle(players);
    }
    
    init(players:number[]) {
        this.shufflePlayerOrder(players);
        this.currentPhase = Phases.MOBILIZAR;
        this.setTotalPlayers();
    }

    nextPlayer(): void{
        this.currentPlayer++;
        this.currentPlayer %= this.totalPlayers;
    }

    getCurrentPlayerId(){
        return this.playersOrders[this.currentPlayer]
    }

    getCurrentPhaseName(){
        return this.phasesNames[this.currentPhase]
    }

    nextPhase(){
        this.currentPhase++;
        if(!(this.currentPhase < this.phasesNames.length)){
            this.nextTurn();
        }
        this.currentPhase %= this.phasesNames.length
    }

    nextTurn(){
        this.nextPlayer();
    }
}