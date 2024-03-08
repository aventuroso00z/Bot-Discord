module.exports = {
    name: "help",
    cooldown: 5,
    aliases: ["commands"],

    run: async function(client, message, args) {
        try {
          message.channel.send({
            embed: {
              title: 'Bot Commands',
              thumbnail: {url: "https://i.imgur.com/A7Fpgqf.png"},
               image: {url: "https://media.discordapp.net/attachments/837513193785524274/1101346037030985831/NF2U_Divider_only_Mashiros_Place__Soliwie4765.png?width=1440&height=350"},
              description: `
                            help
                            ms!createshop
                            ms!rename
                            ping
                            **PARA SABER LAS AUTORREACIONES USA** !page2
                            
                            
                           `
            }
          })
        } catch (err) {
            return;
        }
    }
}
