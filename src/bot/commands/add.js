const { Permissions } = require('discord.js');

module.exports = {
    name: "add",
    cooldown: 6,
    aliases: ['get-in'],

    run: async function(client, message, args) {
        // Verificar si se proporciona el nombre de la categoría
        if (!args[0]) {
            message.channel.send({
                embed: {
                    title: `**❌ | Error**`,
                    description: `You need to provide the name of the category`,
                    color: 0xFF0000
                }
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
            });
            return;
        }

        // Obtener el nombre de la categoría del argumento
        const categoryName = args.join(" ");

        // Buscar la categoría en el servidor
        const category = message.guild.channels.cache.find(c => c.type === "category" && c.name.toLowerCase() === categoryName.toLowerCase());

        // Verificar si se encontró la categoría
        if (!category) {
            message.channel.send({
                embed: {
                    title: `**❌ | Error**`,
                    description: `Category "${categoryName}" not found`,
                    color: 0xFF0000
                }
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
            });
            return;
        }

        // Crear el embed
        const embed = {
            title: "New Ticket",
            description: "Please provide details about your issue.",
            color: 0x00FF00
        };

        // Crear el canal en la categoría especificada
        const ticketChannel = await message.guild.channels.create('ticket', {
            type: 'text',
            parent: category, // Establecer la categoría como el padre
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: message.author.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                // Puedes agregar más permisos aquí según tus necesidades
            ]
        });

        // Enviar el embed al nuevo canal
        ticketChannel.send({ embed: embed });

        // Resto del código para añadir al usuario al ticket
        // ...
    }
};