import { FirstGameScene } from './first-scene';
import Phaser from 'phaser';
// import './reset.css';
import './style.css';
import { MainGameScene } from './main-scene';


const config: Phaser.Types.Core.GameConfig = {
    width: 1227,
    height: 628,
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#B4CDFF',
    scene: [MainGameScene, FirstGameScene]
  };

new Phaser.Game(config);