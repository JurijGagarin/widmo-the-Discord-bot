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

var daneProdukcja = {
    miniumum: 300,
    rozstrzał: 200,
    czas: 7200000,
    czasWyłączenia: 600000,
    idKanału: '1123341676895809686'
}

var daneTestowe = {
    miniumum: 700000000,
    rozstrzał: 0,
    czas: 720,
    czasWyłączenia: 30000,
    idKanału: '1095399742051201135'
}

var d = daneTestowe

exports.run = (client) => {
    if(!client.kulkiLicznik) client.kulkiLicznik = 1
    else client.kulkiLicznik++
    if(!client.kulkiCzas) client.kulkiCzas = Date.now()
    if(!client.kulkiPróg) client.kulkiPróg = Math.floor(Math.random() * d.rozstrzał + d.miniumum);


    if(client.kulkiLicznik > client.kulkiPróg && Date.now() - client.kulkiCzas > d.czas){
        client.kulkiLicznik = 0
        client.kulkiCzas = Date.now()
        client.kulkiPróg = Math.floor(Math.random() * d.rozstrzał + d.miniumum)

        let kulki = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
        let szanse = []
        for(let i in kulki) for(let j = 0; j < 7 - kulki[i].gwiazdki; j++) szanse.push(i)
        let nrPolosowanejKulki = szanse[Math.floor(Math.random() * szanse.length)]
        let polosowanaKulka = kulki[nrPolosowanejKulki]
        let link = polosowanaKulka.imgDrop
        
        let przycisk = new ActionRowBuilder();
        przycisk.addComponents(
            new ButtonBuilder()
                .setCustomId('łapże-przycisk' + Math.random())
                .setLabel('Złap kulkę')
                .setStyle(ButtonStyle.Primary)
        )
        
        client.channels.cache.get(d.idKanału).send({
            content: `Dzika kulka dropnęła`,
            files: [link],
            components: [przycisk]
        }).then(message => {
            let złapano = false
            //let oczekujący = new Set()

            client.on(Events.InteractionCreate, (interaction) => {
                if (interaction.customId.startsWith('łapże-przycisk') /*&& !oczekujący.has(interaction.user.id)*/){
                    //oczekujący.add(interaction.user.id)

                    const modal = new ModalBuilder()
                        .setCustomId('łapże-modal' + Math.random())
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
                
                    console.log(modal.data.custom_id)
                    console.log(interaction.customId)
                    // console.log(interaction)

                    interaction.showModal(modal);
                    console.log('hemos pasado')
                }           

                if (interaction.type === InteractionType.ModalSubmit) {
                    if (interaction.customId.startsWith('łapże-modal')) {
                        //oczekujący.delete(interaction.user.id)
                        const odpowiedź = interaction.fields.fields.first().value

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
                                
                                let dane = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
                                if(typeof dane[interaction.user.id] == 'undefined') dane[interaction.user.id] = []
                                dane[interaction.user.id].push(nrPolosowanejKulki)
                                fs.writeFileSync('./databaseBalls/kulkiUżytkownikówDB.json', JSON.stringify(dane))
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
                    //oczekujący.clear()

                    message.edit({
                        content: `Dzika kulka dropnęła\nUpłynął czas na jej zgadnięcie, prawidłowa odpowiedź brzmi **${polosowanaKulka.nazwa}**`,
                        files: [link],
                        components: [przycisk]
                    })
                }
            }, d.czasWyłączenia);
        })
    }
}

exports.name = "kulkiDrop";
