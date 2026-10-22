const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

const pool = new Pool({
	user: process.env.PSQL_USER,
	host: process.env.PSQL_HOST,
	database: process.env.PSQL_DATABASE ,
	password: process.env.PSQL_PASSWORD ,
	port: process.env.PSQL_PORT,
	ssl: {rejectUnauthorized: false}
});

process.on('SIGINT', function() {
	pool.end();
	console.log('Application successfully shutdown');
	process.exit(0);
});


app.get('/', (req, res) => {
	res.send('Hello World!' );
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost: ${port}`);
})

app.get('/user', (req, res) => {
	employees = []
	pool
		.query('SELECT * FROM employee;')
		.then(query_res => {
			for (let i = 0; i < query_res.rowCount; i++){
				employees.push(query_res.rows[i]);
			}
			const data = {employees: employees};
			console.log(employees);
			res.render('user', data);
	});
});

