const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
let db = require("croxydb")
let ayarlar = require("../ayarlar.json")
exports.run = async (client ,message, args) =>{

    if(![(ayarlar.register)].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('Administrator'))
    return message.reply(`Bu işlemi yapabilmek için sunucuda ${ayarlar.register_yetkilisi} adlı role sahip olmalısın!`) 
    
    let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member){

    let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = db.fetch(`yetkili.${message.author.id}.kadın`);
    let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
    if(erkek === null) erkek = "0"  
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    let kayıtlarss = new EmbedBuilder()
    .setAuthor({name : `Kullanıcının  Toplam Kayıtları`})
    .setColor("Yellow")
    .setThumbnail("https://i.pinimg.com/originals/2e/71/7a/2e717abc1e2f1f62cf4108d1146c243b.gif")
    .setDescription(`
    Toplam Kayıt  Sayı: \`${kayıtlar}\`
    Erkek Kayıt Sayı : \`${erkek}\`
    Kadın Kayıt Sayı : \`${kadın}\`
    `)
    message.reply({embeds : [kayıtlarss]})

}

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsayı','kayıtbilgi']
   };
    
   exports.help = {
    name: 'kayıt-sayı',
    description: 'Botun Pingine Bakarsın',
    usage: '!ping'
   };
    