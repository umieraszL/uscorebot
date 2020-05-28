const commandHanler = require("./handlers/commands.handler")
const { Client, RichEmbed } = require('discord.js');
const client = new Client();


commandHanler(client)

client.on('ready', () => {
  console.log(`${client.user.tag} JEST AKTYWNY!`)
  client.user.setActivity("USCORE.PL",{type: "PLAYING"});
});


client.on('message', msg => {
  const { author, guild, channel, member } = msg

  console.log("bot", guild.me.permissionsIn(channel).has(["ADMINISTRATOR"]))
  console.log("user", member.permissionsIn(channel).has(["ADMINISTRATOR"]))
  if (!member.permissionsIn(channel).has(["ADMINISTRATOR"])) {
    return msg.reply("NIE POSIADASZ PERMISJI!")
  }

  if (msg.author.bot) {
    return
  }

  if (msg.content.indexOf(prefix) !== 0) return

  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  console.log(args)

  const cmd = args.shift().toLocaleLowerCase()
  

  if (cmd === 'ping') {
    channel.send('Pong!');
  }

   
  if(cmd == "infobot"){
    const embed = new RichEmbed()

    .setTitle("✅ Sukces")
    .setDescription("BOTA STWORZYŁ umieraszL. WERSJA BOTA TO v1.2")
    .setColor(0xFF7F00)

    msg.channel.send(embed)
    msg.delete()
  }

  if(cmd == "infosrv"){
  const embed = new RichEmbed()
      
      
      .setColor(0xFF0000)
      .addField("NAZWA SERWERA:", msg.guild.name, false)
      .setTitle("INFO O SERWIE")
      .addField("WŁAŚCICIEL:", msg.guild.owner.user.tag, false)
      .addField("DATA ZAŁORZENIA:", msg.guild.createdAt, false)
      .addField("DATA DOLĄCZENIA:", msg.guild.joinedAt, false)
      .setTimestamp()
      .setThumbnail(msg.guild.iconURL)

    
    msg.channel.send(embed)
    msg.delete()
  }

  if (msg.content.startsWith('%kick')) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          channel.send(`Poprawnie wykickowałem ${user.tag}`);
        }).catch(err => {
          channel.send('Nie byłem w stanie wykickować członka');
          console.error(err);
        });
      } else {
        channel.send('Tego użytkownika nie ma w tej gildii!');
      }
    } else {
      channel.send('Podaj poprawną nazwę użytkownika!');
    }
  }

  
    if (msg.content.startsWith('%ban')) {
      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member.ban({
            reason: 'Źle się zachowywał!',
          }).then(() => {
            channel.send(`Poprwnie zbanowałem ${user.tag}`);
          }).catch(err => {
            channel.send('Nie możesz banować siebie!');
            console.error(err);
          });
        } else {
          channel.send('Tego urzytkownika nie ma na serwie!');
        }
      } else {
        channel.send('Podaj poprawną nazwę użytkownika!');
      }
    }
  

  if(cmd == "youtube"){
    const embed = new RichEmbed()

    .setTitle("YOUTUBE")
    .setDescription("ZAPRASZAM NA KANAŁ youtube.com/c/Neyki !")
    .setColor(0x001eff)

    msg.channel.send(embed)
    msg.delete()
  }


  if(cmd == "rzutmoneta"){

    var wynik = (Math.floor(Math.random() * 2) == 0) ? 'Orzeł' : "Reszka"
    var embed = new RichEmbed()
    .setTitle("Wynik losowania:")
    .setDescription(wynik)
    .setColor("#00d9ff")
    msg.channel.send(embed)
    msg.delete()
  
  }

  if(cmd == "help"){
    const embed = new RichEmbed()

    .setTitle("LISTA KOMEND")
    .setDescription("kick - kickuje użytkowników \n ban - banuje użytkowników \n infobot - podaje informacje na temat bota \n infosrv - podaje informacje na temat serwera \n ping - bot pisze pong \n rzutmoneta - bot wybiera randomowo jedną z dwóch opcji \n youtube - reklama kanału")
    .setColor(0xe3ff00)


    msg.channel.send(embed)
    msg.delete()
    
  }





});








const config = require("./config.js")
const { token, prefix } = require("./config.js")
client.login(token)

