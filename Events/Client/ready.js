const { loadCommands } = require('../../Handlers/commandHandler.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('The Client is now ready.');

        loadCommands(client);
    }
};