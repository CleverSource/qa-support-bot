let current_presence = -1;

module.exports = class DiscordUtils {
	constructor(client) {
		this.client = client;
	}

	/**
	 * Check if a guild member is a moderator
	 * @param {GuildMember} member - the guild member
	 * @returns {boolean}
	 */
	async isStaff(member) {
		return member.roles.cache.some(
			role => role.id === config.roles.moderator || config.roles.manager || config.roles.qa_lead
		);
	}

	/**
	 * Check if a guild member is a moderator
	 * @param {GuildMember} member - the guild member
	 * @returns {boolean}
	 */
	async isModerator(member) {
		return member.roles.cache.some(role => role.id === config.roles.moderator);
	}

	/**
	 * Check if a guild member is a manager
	 * @param {GuildMember} member - the guild member
	 * @returns {boolean}
	 */
	async isManager(member) {
		return member.roles.cache.some(
			role => role.id === config.roles.manager || role.id === config.roles.qa_lead
		);
	}

	/**
	 * Check if a guild member is a developer
	 * @param {GuildMember} member - the guild member
	 * @returns {boolean}
	 */
	async isDeveloper(member) {
		return config.users.developers.includes(member.id);
	}

	/**
	 * Fet a guild's settings
	 * @param {string} id - The guild's ID
	 * @returns {Promise<Model>}
	 */
	async getSettings(id) {
		const data = { id };
		const [settings] = await db.models.Guild.findOrCreate({
			defaults: data,
			where: data
		});
		return settings;
	}

	/**
	 * Select a presence from the config
	 * @returns {PresenceData}
	 */
	static selectPresence() {
		const { length } = config.presence.options;
		let num;

		if (length === 0) return {};
		if (length === 1) num = 0;
		else if (config.presence.randomize) num = Math.floor(Math.random() * length);
		else {
			current_presence += 1;
			if (current_presence === length) current_presence = 0;
			num = current_presence;
		}

		const { activity: name, status, type, url } = config.presence.options[num];
		return {
			activities: [{ name, type, url }],
			status
		};
	}
};
