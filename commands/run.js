// commands/run.js
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('node:fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('run')
    .setDescription('執行程式碼')
    .addStringOption(option =>
      option.setName('code')
        .setDescription('輸入要執行的程式碼')
        .setRequired(true)
    ),
  async execute(interaction) {
      let content = interaction.options.getString('code').slice(3).trim();
      var language = content.split("\n")[0].trim();
      let code = content.split("```")[0].slice(language.length).trim();
      var version = " ";
    fs.writeFile("./code/my_cool_code.txt", code, (err) => {
      if (err) {
        console.error(err);
      }
    });

    async function getlanguage(language) {
      try {
        const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < response.data[i].aliases.length; j++) {
            if (
              response.data[i].language === language ||
              response.data[i].aliases[j] === language
            ) {
              return {
                first: response.data[i].language,
                second: response.data[i].version,
              };
            }
          }
        }
      } catch (error) {
        console.log("取得語言時錯誤:", error);
      }
      return null;
    }

    let values = await getlanguage(language);

    if (values) {
      language = values.first;
      version = values.second;
    } else {
      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("ERROR")
        .setDescription("Language not found")
        .setTimestamp()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        });
      return await interaction.reply({ embeds: [embed] });
    }

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language,
          version: version,
          files: [
            {
              name: "./code/my_cool_code.js",
              content: code,
            },
          ],
          stdin: "",
          args: ["1", "2", "3"],
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_cpu_time: 10000,
          run_cpu_time: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1,
        },
      );
      fs.unlinkSync("./code/my_cool_code.txt");
      if (response.data) {
        if (response.data.run.stderr) {
          let errorMessage = response.data.run.stderr;
          let formattedError = errorMessage.replace(/\n/g, "\n");

          const embedError = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(language)
            .addFields(
              { name: 'ERROR', value: `\`\`\`\n${formattedError}\n\`\`\``}
            )
            .setTimestamp()
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.avatarURL(),
            });
          await interaction.reply({ embeds: [embedError] });
          return;
        }
        if (response.data.run.stdout) {
          let output = response.data.run.stdout.replace(/\n/g, "\n");

          const embedSuccess = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle(language)
            .addFields(
              { name: 'SUCCESS', value: `\`\`\`\n${output}\n\`\`\`` }
            )
            .setTimestamp()
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.avatarURL(),
            });
          await interaction.reply({ embeds: [embedSuccess] });
        } else {
          const embedNoResult = new EmbedBuilder()
            .setColor("#FFFF00")
            .setTitle(language)
            .setDescription("No Output")
            .setTimestamp()
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.avatarURL(),
            });
          await interaction.reply({ embeds: [embedNoResult] });
        }
      }
    } catch (error) {
      const embedError = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(language)
        .setDescription("請稍後再試")
        .setTimestamp()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        });
      await interaction.reply({ embeds: [embedError] });
    }
  }
};
