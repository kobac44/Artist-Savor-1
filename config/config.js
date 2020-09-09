require("dotenv").config();
// require dotenv to local, test, and let jawsdb handle process env
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "passport_demo",
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "passport_demo",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    production: {

        use_env_variable: process.env.JAWSDB_URL,
        dialect: "mysql",

    }
};                                                       