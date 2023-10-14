const { EmbedBuilder } = require('discord.js')

exports.run = (client, message, argumenty) => {
    const exampleEmbed = new EmbedBuilder()
        .setColor(0xE64236)
        .setTitle('Lista komend')
        .setThumbnail('https://i.imgur.com/jnV0OrY.png')
        .addFields(
            { name: 'Podstawowe komendy', value: `***k!daj** [ping biorcy] [nazwa kulki]*- daje kulkę
            ***k!info** [nazwa kulki]*- wyświetla info kulki, o ile ma się ją w kolekcji
            ***k!listaMoich***- lista Twoich kulek
            ***k!wymiana** [ping partnera handlowego]*- inicjuje panel wymiany
            ***dodajże** [nazwa kulki]*- każda wiadomość zaczynająca się tym słowem doda kulkę do wymiany
            ***usuńże** [nazwa kulki]*- usuwa kulkę z wymiany
            ***akceptuję***- akceptuje wymianę
            ***anuluj***- anuluje wymianę\n` },
            { name: 'Komendy administratorskie', value: `***k!lista***- lista wszystkich kulek
            ***k!dodaj** "[nazwa kulki]" "[nazwa kulki w bierniku]" [dane emoji bez <: na początku] [link do zdjęcia kulki na przezroczystym tle] [link do zdjęcia info kulki z abilitkami] [liczba gwiazdek]*- dodaje kulke do systemu
            ***k!usuń** [nazwa kulki]*- ewapuruje kulkę z systemu
            ***k!zamień** [link do zdjęcia z abilitkami] [nazwa kulki]*- zamienia kartę z abilitkami wybranej kulki` },
        )

    message.reply({ embeds: [exampleEmbed] });
}

exports.name = "pomoc";