const {EmbedBuilder, ActionRowBuilder , ButtonBuilder} = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run =  async (client, message, args) => {
    if(![(ayarlar.register)].some(role => message.member.roles.cache.get(role)) && !message.member.permissions.has('Administrator'))
    return message.reply(`Bu işlemi yapabilmek için sunucuda ${ayarlar.register_yetkilisi} adlı role sahip olmalısın!`) 
    


    let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!member) return message.reply({ content: `Bir kullanıcı belirt.` })
if(member.id === message.author.id) return message.reply({ content: 'Kendini Kayıtsız Yapamazsın .' })
if(member.id === client.user.id) return message.reply({ content: 'Botu Kayıtsız Yapamazsın.' })
if(member.id === message.guild.OwnerID) return message.reply({ content: 'Sunucu sahibini Kayıtsız Yapamazsın.' })
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ content: `Bu kullanıcı sizden üst/aynı pozsiyondadır.` })


member.roles.add(ayarlar.kayıtsız) 
member.setNickname(ayarlar.kayıtsız_isim)
member.roles.cache.forEach(r => {
member.roles.remove(r.id)})

 
let kayıtsız = new EmbedBuilder()

.setAuthor({name : `İşlem Başarılı`, iconURL : member.user.avatarURL({dynamic: true})})
.setColor("Random")
.setDescription(`
** ${member} Adlı Kullanıcıyı Kayıtsıza Attım**
`)
message.reply({embeds : [kayıtsız] })

   
  
 
};

exports.conf = {
  aliases: ['kayıtsızagitkopeğ',"kayıtsızz"],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'kayıtsız',
  description: 'Belirttiğiniz kişiyi sunucuda Vip rolü verir.',
  usage: 'Vip üye',
 
};