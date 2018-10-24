const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
var prefix = "b!";

bot.commands = new Discord.Collection()


fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

bot.on('ready', () => {
  bot.user.setActivity(`Supporting ${bot.guilds.size} guilds`)
  console.log("I'm alive!")
})


bot.on("guildCreate", (guild) => {
  let owner = guild.owner
    guild.channels.find("name", "general").send({embed: 
    color: 666836,
    title: "Hello there!",
    description: "Thanks for inviting me!",
     fields: [{
        name: "Just some info:",
        value: "First off, if you encounter a bug fell free to do b!contact to contact the developers. Second off, enjoy the commands I have and if you have susjestion use b!contact to tell me! I'm open for all susjestions currently!!"
        }]
})


})


bot.on("message", message => {
  if(message.author.id == "502522320821157898") return;
if(message.channel.type == "dm") {
  let ar = message.content
    bot.users.get("369256915479560192").send(`${ar}, was sent by ${message.author.username} and there ID is ${message.author.id}.`)
  return;
} else return;
})

bot.on("message", message => {
  bot.user.setActivity(`Supporting ${bot.guilds.size} guilds`)
  if(message.content == "<:adam:504110593767243786>") {
    message.channel.send("https://cdn.discordapp.com/attachments/500119135343083530/504097188905877504/unknown.png")
  }

})

bot.on('message', message => {
  let mArray = message.content.split(" ")
  let args = mArray.slice(1)
  let cmd = bot.commands.get(mArray[0].slice(prefix.length))
  if (!message.content.startsWith(prefix)) return;
  if (cmd) {
    cmd.run(bot, message, args, Discord)
console.log(`${message.author.username} used the ${message.content.split(" ")[0]} command.`)
  }
})

bot.login(process.env.Token)
