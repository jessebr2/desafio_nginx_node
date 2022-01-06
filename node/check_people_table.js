const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const { VAR_STRING } = require('mysql/lib/protocol/constants/types');
const connection = mysql.createConnection(config)
connection.query('SELECT * FROM people', function (error, results, fields) {
    if (error) {
        connection.query("create table people(id int not null auto_increment, name varchar(255), primary key(id))")
        console.log('Tabela criada')
    }
});
connection.end()