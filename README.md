#Snw-bot
Snw-bot is a discord bot.

##Requirements
 - NodeJs: v6.1.0 or higher
 - MongoDb: v3.2 or higher
 
 Both will be installed with the install repo.

##Installation
For Linux:  
See [Snw-bot-installer](https://github.com/snekw/snw-bot-installer) repository.
This bot is easy to install using the info from that repository.

For Windows:  
No info yet.

##Config
After installation add your bot token to the `mainConfig.js`
    
    bot:{
        prefix:'.',
        token: 'TOKEN HERE'    
    }
    
and change the connection string to match your database setup. 
Default string will work if you haven't customized the MongoDb database that is installed on the server.

The api does support ssl. To enable the ssl fill in the config section `ssl` and change the `enable` to `true`.