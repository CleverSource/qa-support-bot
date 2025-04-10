const EventListener = require("../modules/listeners/listener");

module.exports = class GuildCreateEventListener extends EventListener {
	constructor(client) {
		super(client, { event: "guildCreate" });
	}

	async execute(guild) {
		log.info(`Added to "${guild.name}"`);
		this.client.commands.publish(guild);
	}
};
