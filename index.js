require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const managementCommands = require("./commands/management");
const utilityCommands = require("./commands/utility");
const { replyError } = require("./common");

if (!process.env.DISCORD_TOKEN) {
  throw new Error("DISCORD_TOKEN ayarlanmamış. Bir .env dosyası oluşturup token'ı ekleyin.");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const command of [...managementCommands, ...utilityCommands]) {
  client.commands.set(command.data.name, command);
}

client.once("ready", readyClient => {
  console.log(`${readyClient.user.tag} başarıyla bağlandı. ${client.commands.size} komut yüklendi.`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  console.log(`/${interaction.commandName} komutu alındı.`);

  try {
    await interaction.deferReply({ ephemeral: true });
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      await interaction.editReply({ content: "Bu komut bulunamadı." });
      return;
    }

    await command.execute(interaction);
    console.log(`/${interaction.commandName} komutu tamamlandı.`);
  } catch (error) {
    console.error(`/${interaction.commandName} komutu çalıştırılırken hata oluştu:`, error);
    try {
      await replyError(interaction, error);
    } catch (replyError) {
      console.error(`/${interaction.commandName} komutuna hata yanıtı gönderilemedi:`, replyError);
    }
  }
});

client.on("error", error => {
  console.error("Discord bağlantı hatası:", error);
});

process.on("unhandledRejection", error => {
  console.error("Yakalanmamış Promise hatası:", error);
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error("Discord'a giriş yapılamadı:", error);
  process.exitCode = 1;
});
