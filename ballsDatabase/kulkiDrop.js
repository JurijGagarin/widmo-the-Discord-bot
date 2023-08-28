const fs = require('fs')
const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
    InteractionType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js')

exports.run = (client) => {
    if(!client.kulkiLicznik) client.kulkiLicznik = 1
    else client.kulkiLicznik++
    if(!client.kulkiCzas) client.kulkiCzas = Date.now()
    if(!client.kulkiPróg) client.kulkiPróg = Math.floor(Math.random() /** 50 + 50*/+5 );


    if(client.kulkiLicznik > client.kulkiPróg && Date.now() - client.kulkiCzas > 6/*00000*/){
        client.kulkiLicznik = 0
        client.kulkiCzas = Date.now()
        client.kulkiPróg = Math.floor(Math.random() /** 50 + 50*/+5 )

        let kulki = JSON.parse(fs.readFileSync('./ballsDatabase/listaKulekDB.json'))
        let szanse = []
        for(let i in kulki) for(let j = 0; j < 6 - kulki[i].gwiazdki; j++) szanse.push(i)
        let nrPolosowanejKulki = szanse[Math.floor(Math.random() * szanse.length)]
        let polosowanaKulka = kulki[nrPolosowanejKulki]
        let link = polosowanaKulka.imgDrop
        
        let przycisk = new ActionRowBuilder();
        przycisk.addComponents(
            new ButtonBuilder()
                .setCustomId('łapże-przycisk')
                .setLabel('Złap kulkę')
                .setStyle(ButtonStyle.Primary)
        )
        
        client.channels.cache.get('1143955040999067789').send({
            content: `Dzika kulka dropnęła`,
            files: [link],
            components: [przycisk]
        }).then(message => {
            let złapano = false

            client.on(Events.InteractionCreate, (interaction) => {
                if (interaction.customId === 'łapże-przycisk'){
                    const modal = new ModalBuilder()
                        .setCustomId('łapże-modal')
                        .setTitle('Zgadnij nazwę kulki')
                        .addComponents([
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('łapże-modal-input')
                                .setLabel('Twój strzał')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('Tu wpisz swój strzał')
                                .setRequired(true),
                            ),
                        ]);
                
                    interaction.showModal(modal);
                }
            

                if (interaction.type === InteractionType.ModalSubmit) {
                    if (interaction.customId === 'łapże-modal') {
                        const odpowiedź = interaction.fields.getTextInputValue('łapże-modal-input')

                        if(odpowiedź.toLowerCase() == polosowanaKulka.nazwa.toLowerCase()){
                            if(!złapano){
                                złapano = true
                                przycisk.components[0].setDisabled(true)
                                message.edit({
                                    content: `Dzika kulka dropnęła\nKulka złapana przez użytkownika <@${interaction.user.id}>`,
                                    files: [link],
                                    components: [przycisk]
                                })
                                interaction.reply(`Brawo <@${interaction.user.id}>, dodano **${polosowanaKulka.nazwaB}** do Twojej kolekcji`)
                                
                                let dane = JSON.parse(fs.readFileSync('./ballsDatabase/kulkiUżytkownikówDB.json'))
                                if(typeof dane[interaction.user.id] == 'undefined') dane[interaction.user.id] = []
                                dane[interaction.user.id].push(nrPolosowanejKulki)
                                fs.writeFileSync('./ballsDatabase/kulkiUżytkownikówDB.json', JSON.stringify(dane))
                            }
                            else{
                                interaction.reply(`<@${interaction.user.id}>, kulka została już złapana`)
                            }
                        }
                        else{
                            interaction.reply(`<@${interaction.user.id}> zła odpowiedź, próbuj dalej`)
                        }
                    }
                }
            })

            setTimeout(function () {
                if(!złapano){
                    przycisk.components[0].setDisabled(true)
                    message.edit({
                        content: `Dzika kulka dropnęła\nUpłynął czas na jej zgadnięcie, prawidłowa odpowiedź brzmi **${polosowanaKulka.nazwa}**`,
                        files: [link],
                        components: [przycisk]
                })}
            }, 30000);
                

        })
    }
}

exports.name = "kulkiDrop";
