import { Player } from "../classes/player";

export function createCountry(scene: Phaser.Scene, x: number, y: number, player: Player): Phaser.GameObjects.Container {
    let container = scene.add.container(x, y);

    let country = scene.add.image(0, 0, 'circle');
    country.setScale(0.05, 0.05);
    country.setInteractive();

    let count = player.armies;
    let countText = scene.add.text(0, 0, count.toString(), { font: '24px Arial'});
    countText.setOrigin(0.5);

    let plus = scene.add.image(30, 0, 'plus');
    plus.setScale(0.5, 0.5);
    plus.setInteractive();

    let minus = scene.add.image(-30, 0, 'minus');
    minus.setScale(0.5, 0.5);
    minus.setInteractive();

    plus.on('pointerdown', () => {
        if (count < player.armies) {
            count++;
            countText.setText(count.toString());
        }
        else {
            alert('Você não tem mais armies disponíveis');
        }
    });

    minus.on('pointerdown', () => {
        if (count > 0) {
            count--;
            countText.setText(count.toString());
            player.armies++;
        }
    });

    container.add(country);
    container.add(countText);
    container.add(plus);
    container.add(minus);

    return container;
}
