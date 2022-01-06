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
connection.query("create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))")
const sql = "INSERT INTO people(name) values('Jesse')"
connection.query(sql)

app.get('/', (req, res) => {
    let html_response = 'Full Cycle'
    connection.query('SELECT * FROM people', function (error, results, fields) {
        if (error) throw error;
        for (const result of results) {
            html_response = html_response + `<p>${result.name}</p>`
        }
        res.send(html_response);
       });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})