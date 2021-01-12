const getPoolClient = require("./pool");

const connection = async () => {
	const pool = await getPoolClient();

	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log("MySQL pool connected: threadId " + connection.threadId);
			const query = (sql) => {
				return new Promise((resolve, reject) => {
					connection.query(sql, (err, result) => {
						if (err) reject(err);
						resolve(result);
					});
				});
			};
			const release = () => {
				return new Promise((resolve, reject) => {
					if (err) reject(err);
					console.log("MySQL pool released: threadId " + connection.threadId);
					resolve(connection.release());
				});
			};
			resolve({ query, release });
		});
	});
};

module.exports = connection;
