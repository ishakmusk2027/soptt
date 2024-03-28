const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: 131071,
  partials: [Discord.Partials.Channel, Discord.Partials.User],
});
const { REST } = require("@discordjs/rest");//Thailand Codes => https://discord.gg/thailandcodes
const { Routes } = require("discord-api-types/v9");
let Data = require("./Models/RolesData.js");
let Data2 = require("./Models/GuildData.js");//Thailand Codes => https://discord.gg/thailandcodes
const tax = require("probot-tax");//Thailand Codes => https://discord.gg/thailandcodes
client.on("ready", () => {
  const commands = [
    {
      name: "buy",
      description: "Buy Roles",
      options: [
        {
          name: "roles",
          description: "choices role",
          type: 3,
          required: true,
          choices: [
            { name: Data.role1.Name, value: "1" },
          ],
        },
      ],
    },
    {
      name: "roles",
      description: "Roles Info's",
    },
  ];
  const rest = new REST({ version: "9" }).setToken(process.env.token);//Thailand Codes => https://discord.gg/thailandcodes

  (async () => {
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });
      console.log("Done Run ApplicationCommands");//Thailand Codes => https://discord.gg/thailandcodes
      console.log(client.user.tag);
    } catch (error) {
      console.error(error);
    }
  })();
});
const talkedRecently = new Set();//Thailand Codes => https://discord.gg/thailandcodes
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "buy") {
    if (talkedRecently.has(interaction.user.id)) {
      let embed = new Discord.EmbedBuilder()
        .setDescription(
          `
من فضلك انتظر <t:${Math.floor((Date.now() + 7200000) / 1000)}:R>
للشراء مره اخرى
`
        )
        .setColor("#fba14c");
      interaction.reply({ embeds: [embed] });
    } else {
      talkedRecently.add(interaction.user.id);
      setTimeout(() => {
        talkedRecently.delete(interaction.user.id);
      }, 7200000);
      let roles = interaction.options.getString("roles");
      if (roles == "1") {
        const resulting = tax.taxs(Data.role1.Price);
        let embedme = new Discord.EmbedBuilder()
          .setDescription(
            `للحصول على الرتبة برجاء تحويل : ${resulting} ، الى : <@${Data2.Guild.Owner}> عن طريق الامر التالي :
</credits:971443830870126632> -
\`\`\`/credits user:${Data2.Guild.Owner} amount:${resulting}\`\`\`
`
          )
          .setColor("#fba14c")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setTitle("عملية التحويل")
          .setTimestamp();
        await interaction.reply({ embeds: [embedme] }).then(async (message) => {
          const filter = (response) =>
            response.content.startsWith(
              `**:moneybag: | ${interaction.user.username}, has transferred \`$${Data.role1.Price}\``
            ) &&
            response.content.includes(`${Data2.Guild.Owner}`) &&
            response.author.id === Data2.Guild.Probot &&
            response.content.includes(Number(Data.role1.Price));
          const filteruser = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            filteruser,
            time: 25000,
          });
          collector.on("collect", async (_nah) => {
            let user = interaction.guild.members.cache.get(interaction.user.id);
            let role = interaction.guild.roles.cache.get(Data.role1.Id);
            user.roles.add(role.id);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`لقد تمت عملية الشراء بنجاح - ✔️`)
              .addFields(
                { name: "سعر الرتبة :", value: `${Data.role1.Price}` },
                { name: "الرتبة :", value: `<@&${role.id}>` }
              )
              .setColor("#fba14c");
            message.edit({ embeds: [embed] }).then(() => {
              let channel = interaction.guild.channels.cache.get(
                Data2.Channels.Log
              );
              let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setTitle("تم شراء رتبة جديده من قبل :")
                .setColor("#fba14c")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                
                .setTimestamp()
                .setFooter({
                  text: interaction.guild.name,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .addFields(
                  { name: "الشاري :", value: `${interaction.user}` },
                  { name: "الرتبة الذي تم شرائها :", value: `<@&${role.id}>` },
                  { name: "سعر الرتبة :", value: `${Data.role1.Price}` }
                );
              channel.send({ embeds: [embed] });
            });
          });
          collector.on("end", (gg) => {
            message.delete();
          });
        });
      }
      if (roles == "2") {
        const resulting = tax.taxs(Data.role2.Price);
        let embedme = new Discord.EmbedBuilder()
          .setDescription(
            `للحصول على الرتبة برجاء تحويل : ${resulting} ، الى : <@${Data2.Guild.Owner}> عن طريق الامر التالي :
</credits:971443830870126632> -
\`\`\`/credits user:${Data2.Guild.Owner} amount:${resulting}\`\`\`
`
          )
          .setColor("#2f3136")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setTitle("عملية التحويل")
          .setTimestamp()
          .setURL("https://youtube.com/c/ThailandCodes")
          .setFooter({ text: "تايلاند اون توب والباقي فوتوشوب" });
        await interaction.reply({ embeds: [embedme] }).then(async (message) => {
          const filter = (response) =>
            response.content.startsWith(
              `**:moneybag: | ${interaction.user.username}, has transferred \`$${Data.role2.Price}\``
            ) &&
            response.content.includes(`${Data2.Guild.Owner}`) &&
            response.author.id === Data2.Guild.Probot &&
            response.content.includes(Number(Data.role2.Price));
          const filteruser = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            filteruser,
            time: 25000,
          });
          collector.on("collect", async (_nah) => {
            let user = interaction.guild.members.cache.get(interaction.user.id);
            let role = interaction.guild.roles.cache.get(Data.role2.Id);
            user.roles.add(role.id);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`لقد تمت عملية الشراء بنجاح - ✔️`)
              .addFields(
                { name: "سعر الرتبة :", value: `${Data.role2.Price}` },
                { name: "الرتبة :", value: `<@&${role.id}>` }
              )
              .setColor("#2f3136");
            message.edit({ embeds: [embed] }).then(() => {
              let channel = interaction.guild.channels.cache.get(
                Data2.Channels.Log
              );
              let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setTitle("تم شراء رتبة جديده من قبل :")
                .setColor("#2f3136")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                .setURL("https://discord.gg/thailandcodes")
                .setTimestamp()
                .setFooter({
                  text: interaction.guild.name,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .addFields(
                  { name: "الشاري :", value: `${interaction.user}` },
                  { name: "الرتبة الذي تم شرائها :", value: `<@&${role.id}>` },
                  { name: "سعر الرتبة :", value: `${Data.role2.Price}` }
                );
              channel.send({ embeds: [embed] });
            });
          });
          collector.on("end", (gg) => {
            message.delete();
          });
        });
      }
      if (roles == "3") {
        const resulting = tax.taxs(Data.role3.Price);
        let embedme = new Discord.EmbedBuilder()
          .setDescription(
            `للحصول على الرتبة برجاء تحويل : ${resulting} ، الى : <@${Data2.Guild.Owner}> عن طريق الامر التالي :
</credits:971443830870126632> -
\`\`\`/credits user:${Data2.Guild.Owner} amount:${resulting}\`\`\`
`
          )
          .setColor("#2f3136")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setTitle("عملية التحويل")
          .setTimestamp()
          .setURL("https://youtube.com/c/ThailandCodes")
          .setFooter({ text: "تايلاند اون توب والباقي فوتوشوب" });
        await interaction.reply({ embeds: [embedme] }).then(async (message) => {
          const filter = (response) =>
            response.content.startsWith(
              `**:moneybag: | ${interaction.user.username}, has transferred \`$${Data.role3.Price}\``
            ) &&
            response.content.includes(`${Data2.Guild.Owner}`) &&
            response.author.id === Data2.Guild.Probot &&
            response.content.includes(Number(Data.role3.Price));
          const filteruser = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            filteruser,
            time: 25000,
          });
          collector.on("collect", async (_nah) => {
            let user = interaction.guild.members.cache.get(interaction.user.id);
            let role = interaction.guild.roles.cache.get(Data.role3.Id);
            user.roles.add(role.id);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`لقد تمت عملية الشراء بنجاح - ✔️`)
              .addFields(
                { name: "سعر الرتبة :", value: `${Data.role3.Price}` },
                { name: "الرتبة :", value: `<@&${role.id}>` }
              )
              .setColor("#2f3136");
            message.edit({ embeds: [embed] }).then(() => {
              let channel = interaction.guild.channels.cache.get(
                Data2.Channels.Log
              );
              let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setTitle("تم شراء رتبة جديده من قبل :")
                .setColor("#2f3136")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                .setURL("https://discord.gg/thailandcodes")
                .setTimestamp()
                .setFooter({
                  text: interaction.guild.name,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .addFields(
                  { name: "الشاري :", value: `${interaction.user}` },
                  { name: "الرتبة الذي تم شرائها :", value: `<@&${role.id}>` },
                  { name: "سعر الرتبة :", value: `${Data.role3.Price}` }
                );
              channel.send({ embeds: [embed] });
            });
          });
          collector.on("end", (gg) => {
            message.delete();
          });
        });
      }
      if (roles == "4") {
        const resulting = tax.taxs(Data.role4.Price);
        let embedme = new Discord.EmbedBuilder()
          .setDescription(
            `للحصول على الرتبة برجاء تحويل : ${resulting} ، الى : <@${Data2.Guild.Owner}> عن طريق الامر التالي :
</credits:971443830870126632> -
\`\`\`/credits user:${Data2.Guild.Owner} amount:${resulting}\`\`\`
`
          )
          .setColor("#2f3136")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setTitle("عملية التحويل")
          .setTimestamp()
          .setURL("https://youtube.com/c/ThailandCodes")
          .setFooter({ text: "تايلاند اون توب والباقي فوتوشوب" });
        await interaction.reply({ embeds: [embedme] }).then(async (message) => {
          const filter = (response) =>
            response.content.startsWith(
              `**:moneybag: | ${interaction.user.username}, has transferred \`$${Data.role4.Price}\``
            ) &&
            response.content.includes(`${Data2.Guild.Owner}`) &&
            response.author.id === Data2.Guild.Probot &&
            response.content.includes(Number(Data.role4.Price));
          const filteruser = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            filteruser,
            time: 25000,
          });
          collector.on("collect", async (_nah) => {
            let user = interaction.guild.members.cache.get(interaction.user.id);
            let role = interaction.guild.roles.cache.get(Data.role4.Id);
            user.roles.add(role.id);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`لقد تمت عملية الشراء بنجاح - ✔️`)
              .addFields(
                { name: "سعر الرتبة :", value: `${Data.role4.Price}` },
                { name: "الرتبة :", value: `<@&${role.id}>` }
              )
              .setColor("#2f3136");
            message.edit({ embeds: [embed] }).then(() => {
              let channel = interaction.guild.channels.cache.get(
                Data2.Channels.Log
              );
              let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setTitle("تم شراء رتبة جديده من قبل :")
                .setColor("#2f3136")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                .setURL("https://discord.gg/thailandcodes")
                .setTimestamp()
                .setFooter({
                  text: interaction.guild.name,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .addFields(
                  { name: "الشاري :", value: `${interaction.user}` },
                  { name: "الرتبة الذي تم شرائها :", value: `<@&${role.id}>` },
                  { name: "سعر الرتبة :", value: `${Data.role4.Price}` }
                );
              channel.send({ embeds: [embed] });
            });
          });
          collector.on("end", (gg) => {
            message.delete();
          });
        });
      }
      if (roles == "5") {
        const resulting = tax.taxs(Data.role5.Price);
        let embedme = new Discord.EmbedBuilder()
          .setDescription(
            `للحصول على الرتبة برجاء تحويل : ${resulting} ، الى : <@${Data2.Guild.Owner}> عن طريق الامر التالي :
</credits:971443830870126632> -
\`\`\`/credits user:${Data2.Guild.Owner} amount:${resulting}\`\`\`
`
          )
          .setColor("#2f3136")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setTitle("عملية التحويل")
          .setTimestamp()
          .setURL("https://youtube.com/c/ThailandCodes")
          .setFooter({ text: "تايلاند اون توب والباقي فوتوشوب" });
        await interaction.reply({ embeds: [embedme] }).then(async (message) => {
          const filter = (response) =>
            response.content.startsWith(
              `**:moneybag: | ${interaction.user.username}, has transferred \`$${Data.role5.Price}\``
            ) &&
            response.content.includes(`${Data2.Guild.Owner}`) &&
            response.author.id === Data2.Guild.Probot &&
            response.content.includes(Number(Data.role5.Price));
          const filteruser = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            filteruser,
            time: 25000,
          });
          collector.on("collect", async (_nah) => {
            let user = interaction.guild.members.cache.get(interaction.user.id);
            let role = interaction.guild.roles.cache.get(Data.role5.Id);
            user.roles.add(role.id);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`لقد تمت عملية الشراء بنجاح - ✔️`)
              .addFields(
                { name: "سعر الرتبة :", value: `${Data.role5.Price}` },
                { name: "الرتبة :", value: `<@&${role.id}>` }
              )
              .setColor("#2f3136");
            message.edit({ embeds: [embed] }).then(() => {
              let channel = interaction.guild.channels.cache.get(
                Data2.Channels.Log
              );
              let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setTitle("تم شراء رتبة جديده من قبل :")
                .setColor("#2f3136")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                .setURL("https://discord.gg/thailandcodes")
                .setTimestamp()
                .setFooter({
                  text: interaction.guild.name,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .addFields(
                  { name: "الشاري :", value: `${interaction.user}` },
                  { name: "الرتبة الذي تم شرائها :", value: `<@&${role.id}>` },
                  { name: "سعر الرتبة :", value: `${Data.role5.Price}` }
                );
              channel.send({ embeds: [embed] });
            });
          });
          collector.on("end", (gg) => {
            message.delete();
          });
        });
      }
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "roles") {
    let role = interaction.guild.roles.cache.get(Data.role1.Id);
    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("اخر الرتبة الذي تريدها")
        .addOptions(
          {
            label: role.name,
            description: "Role 1",
            value: "1",
          },
        )
    );
    await interaction.reply({
      content: "لرؤية معلومات الرتب واسعارها اختر من الاسفل",
      components: [row],
      ephemeral: true,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  let role = interaction.guild.roles.cache.get(Data.role1.Id);
  const selected = interaction.values[0];
  if (selected === "1") {
    let embed = new Discord.EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "سعر الرتبة :", value: `${Data.role1.Price}` },
        { name: "الرتبة :", value: `<@&${role.id}>` }
      )
      .setDescription(Data.role1.Description)
      .setColor("#2f3136")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [],
      ephemeral: true,
    });
  } else if (selected === "2") {
    let embed = new Discord.EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "سعر الرتبة :", value: `${Data.role2.Price}` },
        { name: "الرتبة :", value: `<@&${role2.id}>` }
      )
      .setDescription(Data.role2.Description)
      .setColor("#2f3136")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [],
      ephemeral: true,
    });
  } else if (selected === "3") {
    let embed = new Discord.EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "سعر الرتبة :", value: `${Data.role3.Price}` },
        { name: "الرتبة :", value: `<@&${role3.id}>` }
      )
      .setDescription(Data.role3.Description)
      .setColor("#2f3136")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [],
      ephemeral: true,
    });
  } else if (selected === "4") {
    let embed = new Discord.EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "سعر الرتبة :", value: `${Data.role4.Price}` },
        { name: "الرتبة :", value: `<@&${role4.id}>` }
      )
      .setDescription(Data.role4.Description)
      .setColor("#2f3136")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [],
      ephemeral: true,
    });
  } else if (selected === "5") {
    let embed = new Discord.EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "سعر الرتبة :", value: `${Data.role5.Price}` },
        { name: "الرتبة :", value: `<@&${role5.id}>` }
      )
      .setDescription(Data.role5.Description)
      .setColor("#2f3136")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [],
      ephemeral: true,
    });
  }
});

process.on("unhandledRejection", error => {
  return;
});
process.on("rejectionHandled", error => {
  return;
});
process.on("uncaughtException", error => {
  return;
});
client.login(process.env.token);