export default function loadCountries(game: Phaser.Scene) {
    const territorios = game.add.group();
    const territoriosData = game.cache.json.get('frame').frames;
    Object.keys(territoriosData).forEach(key => {
        const data = territoriosData[key];
        const sprite = game.add.sprite(0, 0, 'territorios', key).setOrigin(0, 0).setScale(0.5);
        sprite.setData('army', 0);
        sprite.setInteractive();
        const text = game.add.text(0, 0, `${sprite.getData('army')}`, { font: '22px Arial' });
        //vamos ter que mudar provavelmente aqui
        sprite.on('pointerdown', () => {
            sprite.setData('army', sprite.getData('army') + 1);
            text.setText(`${sprite.getData('army')}`);
        });
        territorios.add(sprite);

    });
}