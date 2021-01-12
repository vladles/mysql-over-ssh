const mysql = require("mysql2");
const proxyTunnel = require("../proxy");

const { DB_HOST, DB_USER, DB_PWD, DB_PORT, DB_DATABASE, DB_DEBUG, DB_CONNECTION_LIMIT, DB_SOCKET_PATH, DB_USE_PROXY } = process.env;

const config = {
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PWD,
	database: DB_DATABASE,
	debug: DB_DEBUG ? true : false,
	trace: DB_DEBUG ? true : false,
	connectionLimit: DB_CONNECTION_LIMIT || 10,
	socketPath: DB_SOCKET_PATH,
};

const getPoolClient = () => {
	return new Promise((resolve, reject) => {
		if (DB_USE_PROXY) {
			resolve(createProxyPool());
		} else {
			resolve(createPool());
		}
	});
};

const createPool = () => {
	return mysql.createPool(config);
};

const createProxyPool = async () => {
	const stream = await proxyTunnel();
	const updatedConfig = {
		...config,
		stream,
	};

	return mysql.createPool(updatedConfig);
};

module.exports = getPoolClient;
