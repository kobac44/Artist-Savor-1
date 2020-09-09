require("dotenv").config();
// require dotenv to local, test, and let jawsdb handle process env
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB,
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    },
    production: {

        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"



    }
};                                                       