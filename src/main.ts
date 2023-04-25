import { FirstGameScene } from './first-scene';
import Phaser from 'phaser';
import './reset.css';
import './style.css';


const config: Phaser.Types.Core.GameConfig = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#B4CDFF',
    scene: [FirstGameScene]
  };

new Phaser.Game(config);