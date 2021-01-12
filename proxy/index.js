const fs = require("fs");
const { Client } = require("ssh2");

const { PROXY_HOST, PROXY_PORT, PROXY_USERNAME, PROXY_PWD, PROXY_KEY_PATH, PROXY_FORWARDING_HOST, PROXY_FORWARDING_PORT } = process.env;

const tunnelConfig = {
	host: PROXY_HOST,
	port: PROXY_PORT,
	username: PROXY_USERNAME,
	password: PROXY_PWD,
	privateKey: PROXY_PWD ? null : fs.readFileSync(PROXY_KEY_PATH),
};

const forwardConfig = {
	srcHost: "127.0.0.1",
	srcPort: 12345,
	dstHost: PROXY_FORWARDING_HOST,
	dstPort: PROXY_FORWARDING_PORT,
};

const proxyTunnel = () => {
	return new Promise((resolve, reject) => {
		const sshClient = new Client();
		sshClient
			.on("ready", () => {
				sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, function (err, stream) {
					if (err) reject(err);
                    resolve(stream);				
				});
			})
			.connect(tunnelConfig);
	});
};

module.exports = proxyTunnel;
