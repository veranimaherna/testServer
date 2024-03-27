const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "db_tugas_Akhir", 
    "root", 
    "", 
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;
