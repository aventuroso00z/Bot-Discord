const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "shop",
    cooldown: 5,
    aliases: ["createshop"],

    run: async function(client, message, args) {
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || 'Ticket Bot';
            if (!adminRole) {
                message.channel.send({
                    embed: {
                        title: `๑˚⊹ 🐇 AVISO IMPORTANTE 🌸⊹˚๑`,
                        description: `porfavor elije canal donde la chic@ quiere crear la shop y pone el rol que pueda administrar el canal aparte de la creador@ de la shop `,
                        color: 0xFEFFFF
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            message.react('1111841987360985118');
            let btn = new MessageButton()
                .setStyle("blurple")
                .setEmoji("1111910596040982558")
                .setID("createTicket")
            let row = new MessageActionRow()
                .addComponent(btn);
            ticketChannel.send({
                embed: {
                    color: 0x98C5F6,
                    description: '˚ʚ <:1f_decobow1:1000907445524238377> ﹕Por favor reacciona al emoji mashiro para crear el canal y luego usa el comando ms!rename en el nuevo canal para cambiar el nombre de tu shop usando la plantilla. <:2b_CorazonesNF2U:978709345917349888> ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ㅤ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎   ‏‏‎ ‎‏‏‎ ‎ Plantilla: `₊˚ʚ(emoji)ଓ︰(nombre)♡˚₊` ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ㅤ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎   ‏‏‎ ‎‏‏‎ ‎ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ㅤ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎   ‏‏‎ ‎‏❐﹕___Si hay algun error reporta a un admin___ ˖˚˳⊹ <:m1_amorcitoNF2U:960811776277102602>',
                    title: 'ꔛ๑ ₊˚<a:1071233210371035338:1111841958403518485>  ꒰ Crea tu shop! <a:1071233163772305500:1111841987360985118>  ˖˚˳⊹ꔛ',
                  thumbnail: {url: "https://images-ext-2.discordapp.net/external/R_owQD4J8-XykIfxsbO8JZyT_pAOtf0KCOQS2wVoW_E/https/cdn.discordapp.com/emojis/962610438560944158.gif"},
                },
                component: row
            }).then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
        }
    }
}
