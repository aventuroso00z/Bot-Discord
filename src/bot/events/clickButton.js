const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = async function(client, button) {
    try {
        await button.reply.defer();
        if (button.id == 'createTicket') {
            var nameer = `₊˚ʚ🩰ଓ︰${button.clicker.user.username}♡˚₊`
            var checkTickets = button.guild.channels.cache.find(c => c.name == nameer.split(' ').join('-').toLocaleLowerCase());
            if (checkTickets) {
                button.channel.send({
                    embed: {
                        color: 0xFF0000,
                        title: `**❌ | Error**`,
                        description: `o no este usuario ya abrió una shop, no puede hacerlo 2 veces :c`
                    }
                }).then(async function(m) {
                    setTimeout(() => {
                        m.delete();
                    }, 1000 * 7);
                });
                return;
            }
            // Obtener la nueva categoría del canal
            var categoryID = '1144678567217725490'; // ID de la nueva categoría

            button.guild.channels.create(`₊˚ʚ🩰ଓ︰${button.clicker.user.username}♡˚₊`, {
                permissionOverwrites: [
                    {
                        id: button.clicker.user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"] // Permitir enviar mensajes y ver el canal
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: button.guild.roles.everyone,
                        deny: ["SEND_MESSAGES", "VIEW_CHANNEL"] // Denegar enviar mensajes y ver el canal para @everyone
                    }
                ],
                type: 'text',
                parent: categoryID // Establecer la nueva categoría del nuevo canal
            }).then(async function(channel) {
                require('quick.db').set(`TicketControl_${channel.id}`, button.clicker.user.id);
                let btn = new MessageButton()
                    .setStyle("grey")
                    .setEmoji("1111824471238647837")
                    .setID("configTicket");
                let row = new MessageActionRow()
                    .addComponent(btn);
                channel.send(`₊˚ ✿ <a:1071233210371035338:1111841958403518485> <@${button.clicker.user.id}> Miren una nueva shop <a:1015068861344780339:1018234829139095594> ✿˚₊`, {
                    embed: {
                        thumbnail: {url: "https://images-ext-1.discordapp.net/external/w3SCfxwCHPNKAnCqr9IBYaYzzwv0TwGqlDLyMJMxcrc/https/cdn.discordapp.com/emojis/1006408260645040128.gif"},
                        title: "NEW SHOP",
                        description: '‧˚₊ ꒰ Cuando termines tu shop reacciona al emoji para usar el ping shop. Si quieres cambiar el nombre usa `ms!rename`  ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎  ㅤ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎   ‏‏‎ ‎‏‏‎ ‎              ➯ Menciona a un admin para borrar este mensaje  ʕ •ᴥ•ʔ  ﾟ˖ ଓ',
                        color: 0x00D8FF
                    },
                    component: row
                });
            });
        } else if (button.id == 'configTicket') {
            if (!button.channel.name.includes("")) {
                return;
            }
            var member = require('quick.db').fetch(`TicketControl_${button.channel.id}`);
            button.channel.overwritePermissions([
                {
                    id: member,
                    deny: ['SEND_MESSAGES'],
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: button.guild.roles.everyone,
                    deny: ["SEND_MESSAGES"] // Denegar enviar mensajes para @everyone
                },
                {
                    id: button.clicker.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"] // Permitir enviar mensajes y ver el canal
                }
            ]);
            button.channel.send(`  ଘ <a:1g_HannieNF2UHeartSpin:1071233185784008754>    ⌦ ⊹ <@&1014580488192663602>  <a:1g_HannieNF2UWingsHeart:1071233163772305500> ꒦ ♡₊˚๑`, {
                embed: {
                    thumbnail: {url: "https://media.discordapp.net/attachments/1070920207125708861/1113223542604038234/cositomashiro.png?width=473&height=473"},
                    title: ' <a:1g_HannieNF2UHearts:1071233210371035338> ✦ യ 𝓝ew shop 𝓜ashiros യ ✦ <:2b_BrillosNF2U:978709329253376111>',
                    description: `✧ ๑‧˚ <a:m1_kitty6:892957114245447701>  ꒱꒱ Hay una nueva tienda creada! <:1e_bunny1:1000908376315809863> ✧˚ ๑`,
                    image: {url: "https://media.discordapp.net/attachments/1070920207125708861/1112468397171683428/MashiPixelShop.gif?width=1025&height=176"},
                    color: 0xFF91B0
                }
            }).then(async function(m) {
                setTimeout(() => {
                    m.delete();
                }, 1000 * 9000);
            });

        }
        // Resto del código...
    } catch (err) {
        console.log(err)
    }
}
