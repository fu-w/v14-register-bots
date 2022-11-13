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

let tag = ayarlar.tag;
let name = args[1]
if(!name) return message.reply('Bir İsim Belirt Kanka.')
let yas = args[2]
if(!yas) return message.reply("Bir Yaş Belirt Kanka.")
member.setNickname(`${tag} ${name} | ${yas}`)
 
let kayıtsız = new EmbedBuilder()

.setThumbnail(member.user.avatarURL({dynamic: true}))
.setColor("Random")
.setDescription(`
** ${member} Adlı kullanıcın ismini değiştirdim yeni ismi \`${tag} ${name} | ${yas}\` **
`)
message.reply({embeds : [kayıtsız] })

   
  
 
};

exports.conf = {
  aliases: ['isim',"isimdeğiş"],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'i',
  description: 'Belirttiğiniz kişiyi sunucuda Vip rolü verir.',
  usage: 'Vip üye',
 
};