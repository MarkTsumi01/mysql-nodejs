const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql-nodejs',
})

connection.connect((err) => {
    if (err) {
        console.log('Failed to connect Database',err)
        return;
    }
    console.log('Connect to Database Success')
})



//Query
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});




//Insert 
app.post('/api/insert',(req,res) => {

    const {firstname, lastname} = req.body;
    const query = 'INSERT INTO users(firstname, lastname) VALUES(?,?)';
    connection.query(query,[firstname,lastname], (err, results) => {
        if (err) {
            console.log('Error inserting data', err);
            res.status(500).json({error: 'Internal server error'});
        }
        res.json({
             msg: "Inserted Successfull",
             insertId: results.insertId
        })
    })

})



//Show port running on
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})