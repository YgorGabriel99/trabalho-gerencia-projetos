import { Player } from "../classes/player";

export function createContadorImagem(scene: Phaser.Scene, x: number, y: number, player: Player) : Phaser.GameObjects.Image {
    let country = scene.add.image(x, y, 'circle');
    country.setScale(0.05, 0.05);
    country.setInteractive();

    let count = 0;
    let countText = scene.add.text(x, y, count.toString(), { font: '24px Arial'});
    countText.setOrigin(0.5);

    country.on('pointerdown', () => {
      // Verifique se o jogador ainda tem exércitos disponíveis
      if (player.armies > 0) {
        count++;
        countText.setText(count.toString());
        player.armies--;
      } else {
        alert("Você não tem mais exércitos disponíveis!");
      }
    });
  
    return country;
  }