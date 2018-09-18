const express = require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mysql = require('mysql')

const PORT = 3000;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'sql7.freesqldatabase.com',
    user     : 'sql7256433',
    password : 'aZUlBF2199',
    database : 'sql7256433'
});

app.get('/', (req, res) => res.send({'a': 'Hello World!'}));

app.get('/login/:username/:password', (req, res, next) => {
    try {
        getUser(req.params, (result) => {
            if(result) {
                res.send({ login: true, ...result });
            } else {
                res.send({ login: false });
            }
        });
        
    } catch(error) {
        res.send({ login: false, error });
    }
});


app.listen(PORT, console.log(`Starting the server at port ${PORT}`));

module.exports = app;

//================= DB =====================
/**
 * Creates a db connection from pool and releases it after calling da done callback 
 * @param {*} done callback having as parameter the connection
 */
const connect = (done) => {
    pool.getConnection((err, connection) => {
        try{
            connection.connect();
            done(connection);
        } finally {
            connection.release();
        }
    });
}


const getUser = ({ username, password }, callback) => {
    connect((connection) => {
        connection.query(` Select * from users Where Username = '${username}' && Password = '${password}' `, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows[0]);
        });
    });
};
