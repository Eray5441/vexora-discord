const { PermissionFlagsBits } = require("discord.js");

async function fetchGuildMember(guild, userId) {
  try {
    return await guild.members.fetch(userId);
  } catch (error) {
    if (error.code === 10007) {
      return null;
    }
    throw error;
  }
}

async function getGuildMember(interaction, optionName) {
  const user = interaction.options.getUser(optionName, true);
  const member = await fetchGuildMember(interaction.guild, user.id);

  if (!member) {
    throw new Error("Bu kullanıcı sunucunun bir üyesi değil.");
  }

  return member;
}

function ensurePermission(interaction, permission, label) {
  if (!interaction.guild) {
    throw new Error("Bu komut bir sunucuda kullanılmalıdır.");
  }
  if (!interaction.memberPermissions?.has(permission)) {
    throw new Error(`Bu komut için **${label}** iznine sahip olmalısınız.`);
  }
}

function ensureBotPermission(interaction, permission, label) {
  const botMember = interaction.guild.members.me;
  if (!botMember?.permissions.has(permission)) {
    throw new Error(`Botta **${label}** izni yok.`);
  }
}

async function ensureRoleManageable(interaction, role) {
  if (interaction.user.id === interaction.guild.ownerId) {
    return;
  }

  const actor = await interaction.guild.members.fetch(interaction.user.id);
  if (actor.roles.highest.comparePositionTo(role) <= 0) {
    throw new Error("En yüksek rolünüzle aynı veya daha yüksek bir rolü yönetemezsiniz.");
  }
}

async function ensureManageable(interaction, target, subject) {
  const botMember = interaction.guild.members.me;

  if (target.id === interaction.guild.ownerId) {
    throw new Error("Sunucu sahibine bu işlem uygulanamaz.");
  }
  if (target.id === interaction.client.user.id) {
    throw new Error("Bot bu işlemi kendisine uygulayamaz.");
  }
  if (interaction.user.id !== interaction.guild.ownerId) {
    const actor = await interaction.guild.members.fetch(interaction.user.id);
    if (actor.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
      throw new Error(`${subject}, en yüksek rolünüzle aynı veya daha yüksek bir role sahip.`);
    }
  }
  if (!botMember || botMember.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
    throw new Error(`${subject}, botun en yüksek rolüyle aynı veya daha yüksek bir role sahip.`);
  }
}

async function replyError(interaction, error) {
  const message = error instanceof Error ? error.message : "Komut yürütülürken bir hata oluştu.";

  if (interaction.deferred) {
    await interaction.editReply({ content: message });
  } else if (interaction.replied) {
    await interaction.followUp({ content: message, ephemeral: true });
  } else {
    await interaction.reply({ content: message, ephemeral: true });
  }
}

module.exports = {
  PermissionFlagsBits,
  ensureBotPermission,
  ensureManageable,
  ensurePermission,
  ensureRoleManageable,
  fetchGuildMember,
  getGuildMember,
  replyError,
};
