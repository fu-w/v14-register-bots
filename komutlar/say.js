const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
let db = require("croxydb")
let ayarlar = require("../ayarlar.json")

exports.run = async (client ,message, args) =>{

var tag = ayarlar.tag
var toplamtaglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0099").size;
var üye = message.guild.memberCount
var sestekiüye = message.guild.members.cache.filter(s => s.voice.channel).size;
var booster = message.guild.premiumSubscriptionCount
var boostLevel =  message.guild.premiumTier

let say = new EmbedBuilder()
.setAuthor({name : `${message.guild.name} İstatistiği`, iconURL : message.guild.iconURL()})
.setColor("Blue")
.setThumbnail(message.guild.iconURL())
.setDescription(`
● Sunucumuzun Tagı: \`${tag}\`
● Sunucumuzun Toplam Taglı Üyesi: \`${toplamtaglı}\`
● Sunucumuzun Toplam Üyesi: \`${üye}\`
● Sunucumuzun Ses Aktifliği: \`${sestekiüye}\`
● Sunumuzun Boost Sayısı: \`${booster} -Leveli ${boostLevel}\`

`)

message.reply({embeds : [say]})




}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayımız','sunucuista']
   };
    
   exports.help = {
    name: 'say',
    description: 'Botun Pingine Bakarsın',
    usage: '!ping'
   };
    
