# Katheryne

## What she do
Not much! Just making a bot cause I was getting tired of manually doing stuff. As I get more ideas, I'll add it to this bot. 

## Features
- Convert Hoyoverse codes into embedded links
- Allows you to set a role to ping for codes

## Stacks
- [Discord.js](https://discord.js.org/#/)
- [Keyv](https://keyv.js.org/#/)
- [MongoDB Atlas](https://www.mongodb.com/)

## How to deploy

### Online

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/jurytan/gi-discord-bot)

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

### Local
To start: 
`npm start` or `node index.js`

To deploy commands:
`npm run deploy-commands` or `node deploy-commands.js`
When you see `Successfully registered application commands.` and the command doesn't auto-exit, you can close the process by using `Ctrl + C`. There's a bug with keyv and the MongoDB connector where it doesn't handle MongoDB Atlas connections properly, but you can quit without an issue. 

### Docker
More info coming soon

## FAQ

**Q: Why doesn't any of the `genshin-role` commands work for me?**
**A:** This is because you do not have a role with `Administrator` or `Manage Server` set. Please assign a role with one of the previously listed permissions to the affected user. Due to a limitation, even owners need to explicitly create a role and add this to themselves. 

