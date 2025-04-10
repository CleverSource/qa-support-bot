/* eslint-disable new-cap, no-empty-pattern */
const { DataTypes } = require("sequelize");

module.exports = ({}, sequelize) => {
	const { DB_TABLE_PREFIX } = process.env;

	sequelize.define(
		"Category",
		{
			claiming: {
				defaultValue: false,
				type: DataTypes.BOOLEAN
			},
			guild: {
				allowNull: false,
				references: {
					key: "id",
					model: DB_TABLE_PREFIX + "guilds"
				},
				type: DataTypes.CHAR(19),
				unique: "name-guild"
			},
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.CHAR(19)
			},
			image: {
				allowNull: true,
				type: DataTypes.STRING
			},
			max_per_member: {
				defaultValue: 1,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: "name-guild"
			},
			name_format: {
				allowNull: false,
				defaultValue: config.text.ticket_name,
				type: DataTypes.STRING
			},
			opening_message: {
				defaultValue: config.text.opening_message,
				type: DataTypes.TEXT
			},
			ping: {
				defaultValue: [],
				get() {
					const raw_value = this.getDataValue("ping");
					return raw_value
						? typeof raw_value === "string"
							? JSON.parse(raw_value)
							: raw_value
						: null;
				},
				type: DataTypes.JSON
			},
			roles: {
				allowNull: false,
				get() {
					const raw_value = this.getDataValue("roles");
					return raw_value
						? typeof raw_value === "string"
							? JSON.parse(raw_value)
							: raw_value
						: null;
				},
				type: DataTypes.JSON
			}
		},
		{
			paranoid: true,
			tableName: DB_TABLE_PREFIX + "categories"
		}
	);
};
