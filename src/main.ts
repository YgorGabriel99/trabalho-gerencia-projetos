// import { FirstGameScene } from './first-scene';
import Phaser from 'phaser';
// import './reset.css';
import './style.css';
import { MainGameScene } from './main-scene';
// import { GamePlayer } from './model/GamePlayer';
import PreloadScene from './scenes/PreloadScene';
import TurnControllerScene from './scenes/TurnControllerScene';
import InitGameScene from "./scenes/InitGameScene"

const config: Phaser.Types.Core.GameConfig = {
    width: 1227,
    height: 628,
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#B4CDFF',
    dom: {
      createContainer: true,
    },
    scene: [PreloadScene, MainGameScene,TurnControllerScene, InitGameScene]
  };

// new Phaser.Game(config);

export class WarGame extends Phaser.Game{
    constructor(config:Phaser.Types.Core.GameConfig) {
      super(config); 
    }
}

new WarGame(config);
// game.addPlayer(new GamePlayer({id:1, name:'Paulo'}));
// game.addPlayer(new GamePlayer({id:2, name:'Tiago'}));

// const player1 = new Player()
// console.log(game.players)



