const { Client, GatewayIntentBits, Collection } = require("discord.js")
const Discord = require("discord.js")
const db = require("nrc.db")
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences] });
const fs = require("fs")
const moment = require("moment")
const {token, prefix} = require("./set")
const ayarlar = require("./ayarlar.json")
require("./loading")(client)
require("moment-duration-format")
//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK

client.on("ready" , ()=>{
    client.user.setActivity(`Furki V14 Register New`)
    client.user.setStatus("dnd")
console.log("Bot Aktif Kanka")
})
process.on('uncaughtException', function(err) { 
  //console.log(err) 
});
// Hoşgeldin Mesaj

client.on("guildMemberAdd", message =>{

let guild = message.guild; 

    let aylartoplam = {
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
      };
      let aylar = aylartoplam;

      let user = client.users.cache.get(message.id);

      const kurulus = new Date().getTime() - user.createdAt.getTime();
      const ayyy = moment.duration(kurulus).format("M");
      var kontrol = [];
    
      if (ayyy < 1) {
        kontrol = ":x: **Şüpheli** ";
      }
      if (ayyy > 1) {
        kontrol = ":white_check_mark: **Güvenilir** ";
      }
    
client.channels.cache.get(ayarlar.register_kanal)
.send(`
${guild.name} Sunucusuna Hoşgeldin ${message.user}

Seninle Birlikte ${guild.memberCount} Kişi Olduk

Kayıt Olmak İçin <@&${ayarlar.register_yetkilisi}> Beklemelisin

Tagımızı Alarak Ailemize Katılabilirsin (\`.tag\`)

Hesabın  ${aylar[moment(user.createdAt).format("MM")]} ${moment(
 user.createdAt
).format(
 "YYYY HH:mm:ss"
)}  Zamanında Açılmış** ${kontrol} 


`)
})
//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK
//  Otorol Ve Oto İsim
client.login(token)

client.on("guildMemberAdd" , member =>{

    member.roles.add(ayarlar.kayıtsız)
    member.setNickname(ayarlar.kayıtsız_isim)

})

client.on("guildMemberAdd" , member =>{

    member.roles.add(ayarlar.kayıtsız)
    member.setNickname(`${ayarlar.tag} ${ayarlar.kayıtsız_isim}`)

})
//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK
// TagRol

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = ayarlar.sunucu//Sunucunuz
    const roleID = ayarlar.tagrol//taglırolü
    const tag = ayarlar.tag
    const chat = ayarlar.genelchat// chat
    const log2 = ayarlar.taglog// log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
     if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(` ${newUser} isminden ${ayarlar.tag} çıkartarak ailemizden ayrıldı!`)
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(`${newUser} ismine ${ayarlar.tag} alarak ailemize katıldı`)
        }}})

//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK
// Tag Mesaj 


client.on("messageCreate", message =>{
    if (message.content.toLowerCase() === ".tag") {
        //TAG
        message.reply(ayarlar.tag);
      }


})


client.on("messageCreate", message =>{
    if (message.content.toLowerCase() === "tag") {
        //TAG
        message.reply(ayarlar.tag);
      }


})
//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK
// Komut İşleme

const log = message => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
	if (err) console.error(err);
	log(`${files.length} komut yüklenecek.`);
	files.forEach(f => {
	  let props = require(`./komutlar/${f}`);
	  log(`Yüklenen komut: ${props.help.name}.`);
	  client.commands.set(props.help.name, props);
	  props.conf.aliases.forEach(alias => {
		client.aliases.set(alias, props.help.name);
	  });
	});
  });
  client.reload = command => {
	return new Promise((resolve, reject) => {
	  try {
		delete require.cache[require.resolve(`./komutlar/${command}`)];
		let cmd = require(`./komutlar/${command}`);
		client.commands.delete(command);
		client.aliases.forEach((cmd, alias) => {
		  if (cmd === command) client.aliases.delete(alias);
		});
		client.commands.set(command, cmd);
		cmd.conf.aliases.forEach(alias => {
		  client.aliases.set(alias, cmd.help.name);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
  client.load = command => {
	return new Promise((resolve, reject) => {
	  try {
		let cmd = require(`./komutlar/${command}`);
		client.commands.set(command, cmd);
		cmd.conf.aliases.forEach(alias => {
		  client.aliases.set(alias, cmd.help.name);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
  client.unload = command => {
	return new Promise((resolve, reject) => {
	  try {
		delete require.cache[require.resolve(`./komutlar/${command}`)];
		let cmd = require(`./komutlar/${command}`);
		client.commands.delete(command);
		client.aliases.forEach((cmd, alias) => {
		  if (cmd === command) client.aliases.delete(alias);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
//Furki#0002 Sunucum https://discord.gg/nhRFdyr6DK