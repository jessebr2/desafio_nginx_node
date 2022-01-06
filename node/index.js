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
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function check_table(){
    const connection1 = mysql.createConnection(config)
    connection1.query('SELECT * FROM people', function (error, results, fields) {
        if (error) {
            connection.query("create table people(id int not null auto_increment, name varchar(255), primary key(id))")
            console.log('Tabela criada')
            sleep(3000)
        }
    });
    connection1.end()
}
check_table()

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