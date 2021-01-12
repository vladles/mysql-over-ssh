require("dotenv").config();
const connection = require("./mysql/index");

const start = async () => {
	try {
		const db = await connection();

		await db.query("show tables");
		await db.release();
	} catch (error) {
		console.error(error);
	}
};

start();
