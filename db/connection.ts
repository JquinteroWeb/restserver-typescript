import { Sequelize } from 'sequelize';
//databasename - user - password and object with sever  information
const db = new Sequelize('node','root','',{
    host:'localhost',
    dialect:'mysql',
    //logging: false,
});

export default db;
