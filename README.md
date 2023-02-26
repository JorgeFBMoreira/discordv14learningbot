# Discord Learning Bot (v14)

This is a discord learning bot made with [Discord.js](https://discord.js.org) (v14).

At this current moment in time, the bot isn't made to be easy to use or practical. The main purpose is to follow through all the tutorials and online content I could find, not matter how good or bad it is (in a practical perspective).

- Example: at this current moment in time, only the "order" command is ""working"".





## Some important Notes

This isn't my first bot at any means, but I'm following some tutorials in order to have a start point.

Some of them might be extremely usefull, others not so much.

All of the tutorials, sources and material I find on the internet that, to some extent, helped in building this specific project will be listed down below.

    ! This bot is made with the purpose of having a varity amount of codes that explores a little bit of what discord.js has to offer. It's not, technically, a bot which you can start using and having a good time.





## How to install and run the bot?

Before jumping in the code and making it work, you will need to create a file called `.env`.
In that file, you should have something similar to the code below:
```env
BOT_TOKEN = place_your_discord_bot_token_here
BOT_CLIENT_ID = place_your_discord_client_or_application_id_here
GUILD_ID = place_your_discord_guild_id_here
```

To install all dependencies:
> npm i
or
> npm install

To run the bot, use the following command:
> npm run start:dev

It'll run the process with nodemon which, in summary, will restart your bot anytime a change is made - whether it's a new change made in the code or when any error accours.





## Libraries in use

- [Discord.js](https://discord.js.org)
- Dotenv
- Nodemon





## Tutorials, sources and online material used in this project

-  [Discord.js v14 Tutorials](https://youtube.com/playlist?list=PL_cUvD4qzbkwA7WITceoc2_FFjQsBkwX7), provided by [Anson the Developer](https://www.youtube.com/@ansonthedev)