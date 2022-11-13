const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
let db = require("croxydb")
let ayarlar = require("../ayarlar.json")

exports.run = async (client ,message, args) =>{
   let button = new ActionRowBuilder()
   .addComponents(
new ButtonBuilder()
.setCustomId('man')
.setLabel('Kayıt Başarılı')
.setStyle(3)
.setDisabled(true)


   )
   
    if(![(ayarlar.register)].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('Administrator'))
    return message.reply(`Bu işlemi yapabilmek için sunucuda ${ayarlar.register_yetkilisi} adlı role sahip olmalısın!`) 
    
    let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.reply(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.reply('Kendini kayıt edemezsin.')
if(member.id === message.guild.ownerID) return message.reply('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
    
let tag = ayarlar.tag;
let name = args[1]
if(!name) return message.reply('Bir İsim Belirt Kanka.')
let yas = args[2]
if(!yas) return message.reply("Bir Yaş Belirt Kanka.")

db.add(`yetkili.${message.author.id}.kız`, 1 )
db.add(`yetkili.${message.author.id}.toplam`, 1 )
let alldata = db.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${yas}`)
member.roles.add(ayarlar.kızrol1)
member.roles.add(ayarlar.kızrol2)
member.roles.remove(ayarlar.kayıtsız)
let kız = new EmbedBuilder()
.setAuthor({name : `Kayıt Başarılı`, iconURL : member.user.avatarURL({dynamic : true})})
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setColor("Random")
.setDescription(`
**Sunucuya Kayıt Olan Kullanıcı** : ${member}
**Kayıt Eden Yetkili** : ${message.author}
**Kayıt Sonrası İsim** : \`${tag} ${name} | ${yas}\`
**Kayıt Sonucu Yeni Verilen Roller** : <@&${ayarlar.kızrol1}> - <@&${ayarlar.kızrol2}>
`)
message.reply({embeds : [kız] , components : [button]})
client.channels.cache.get(ayarlar.genelchat).send(`${member} Sunucumuza kayıt oldu hoşgeldinn <3`)
   
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kız','kadın', 'k']
   };
    
   exports.help = {
    name: 'girl',
    description: 'Botun Pingine Bakarsın',
    usage: '!ping'
   };
    