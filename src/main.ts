import { FirstGameScene } from './first-scene';
import Phaser from 'phaser';
// import './reset.css';
import './style.css';
import { MainGameScene } from './main-scene';
import { GamePlayer } from './model/GamePlayer';


const config: Phaser.Types.Core.GameConfig = {
    width: 1227,
    height: 628,
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#B4CDFF',
    scene: [MainGameScene]
  };

// new Phaser.Game(config);

export class WarGame extends Phaser.Game{
    constructor(config:Phaser.Types.Core.GameConfig) {
      super(config);
      
    }
}

const game = new WarGame(config);
// game.addPlayer(new GamePlayer({id:1, name:'Paulo'}));
// game.addPlayer(new GamePlayer({id:2, name:'Tiago'}));

// const player1 = new Player()
// console.log(game.players)



