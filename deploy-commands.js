require("dotenv").config();

const { REST, Routes } = require("discord.js");
const managementCommands = require("./commands/management");
const utilityCommands = require("./commands/utility");

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  console.error("DISCORD_TOKEN ve DISCORD_CLIENT_ID ayarlanmamış. .env.example dosyasını .env olarak kopyalayıp bu değerleri .env dosyasında doldurun.");
  process.exit(1);
}

if (!/^\d{17,20}$/.test(DISCORD_CLIENT_ID)) {
  console.error("DISCORD_CLIENT_ID geçersiz. Discord Developer Portal'daki uygulama ID'sini kontrol edin.");
  process.exit(1);
}

const commands = [...managementCommands, ...utilityCommands].map(command => command.data.toJSON());
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const route = Routes.applicationCommands(DISCORD_CLIENT_ID);

rest.put(route, { body: commands })
  .then(() => {
    console.log(`${commands.length} komut tüm sunucular için kaydedildi.`);
  })
  .catch(error => {
    console.error("Slash komutları kaydedilemedi:", error);
    process.exitCode = 1;
  });
