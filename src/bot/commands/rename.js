const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "rename",
    cooldown: 5,
    aliases: ["changerename"],

    run: async function(client, message, args) {
        try {
            var newName = args.join(' ');
            if (!message.member.permissions.has('VIEW_CHANNEL')) {
                return message.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `Necesitas permisos para administrar canales para usar este comando.`,
                        color: 0xFF0000
                    }
                }).then(msg => {
                    msg.delete({ timeout: 7000 }).catch(err => console.error(err));
                });
            }
            if (!newName) {
                return message.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `Por favor, proporciona un nuevo nombre para el canal.`,
                        color: 0xFF0000
                    }
                }).then(msg => {
                    msg.delete({ timeout: 7000 }).catch(err => console.error(err));
                });
            }
            let btnConfirm = new MessageButton()
                .setStyle("green")
                .setLabel("Confirmar")
                .setID("renameConfirm");

            let btnCancel = new MessageButton()
                .setStyle("red")
                .setLabel("Cancelar")
                .setID("renameCancel");

            let row = new MessageActionRow()
                .addComponent(btnConfirm)
                .addComponent(btnCancel);

            message.channel.send({
                embed: {
                    title: `**Cambiar Nombre de Canal**`,
                    description: `¿Estás seguro de que deseas cambiar el nombre del canal a **${newName}**?`,
                    color: 0xFF9BBA
                },
                component: row
            }).then(async (msg) => {
                const filter = (button) => button.clicker.user.id === message.author.id;
                const collector = msg.createButtonCollector(filter, { time: 15000 });

                collector.on('collect', async (button) => {
                    if (button.id === 'renameConfirm') {
                        // Aquí puedes agregar el código para cambiar el nombre del canal
                        message.channel.setName(newName)
                            .then(updated => console.log(`Nombre del canal actualizado a ${updated.name}`))
                            .catch(console.error);
                        // Puedes agregar un mensaje de confirmación si lo deseas
                        message.channel.send({
                            embed: {
                                title: `**✅ | Éxito**`,
                                description: `El nombre del canal ha sido cambiado a **${newName}**.`,
                                color: 0x00FF00
                            }
                        });
                    } else if (button.id === 'renameCancel') {
                        msg.delete();
                        return message.channel.send({
                            embed: {
                                title: `**❌ | Cancelado**`,
                                description: `El cambio de nombre del canal ha sido cancelado.`,
                                color: 0xFF0000
                            }
                        });
                    }
                });

                collector.on('end', () => {
                    msg.delete().catch(err => console.error(err));
                });
            });
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    title: `**❌ | Error**`,
                    description: `Se produjo un error al intentar cambiar el nombre del canal.`,
                    color: 0xFF0000
                }

            });
        }
    }
}